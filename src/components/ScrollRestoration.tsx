import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

type Props = {
  // seletor do container rolável (se não informado usa window)
  selector?: string;
  // comportamento do scroll ao restaurar/ir para topo
  behavior?: ScrollBehavior;
  // número de tentativas para localizar o container quando a página usa animações
  maxAttempts?: number;
  // intervalo entre tentativas (ms)
  attemptInterval?: number;
};

/**
 * ScrollRestoration
 *
 * - Preserva posição de scroll por entrada no histórico (location.key).
 * - Restaura posição quando navigationType === 'POP' (voltar/avançar).
 * - Rola para topo em navegações novas (PUSH/REPLACE).
 * - Suporta container seletor (ex.: '#root' ou '.app') ou window.
 *
 * Uso: montar dentro de <BrowserRouter> (ex.: em main.tsx, logo depois do Router).
 */
export default function ScrollRestoration({
  selector,
  behavior = "auto",
  maxAttempts = 10,
  attemptInterval = 80,
}: Props) {
  const location = useLocation();
  const navigationType = useNavigationType();

  // helper to produce a stable key for the current location when location.key is absent
  const makeEntryKey = (loc: { pathname: string; search: string; key?: string | null }) =>
    loc.key ?? `${loc.pathname}${loc.search}`;

  // mapa de key => scroll position
  const positionsRef = useRef<Map<string, number>>(new Map());

  // referência ao último pathname/key (atual)
  const currentKeyRef = useRef<string | null>(makeEntryKey(location));

  // cria funções para obter/definir scroll (window ou container)
  const getScrollTop = (): number => {
    if (selector) {
      const el = document.querySelector<HTMLElement>(selector);
      return el ? el.scrollTop : 0;
    }
    return window.scrollY || window.pageYOffset || 0;
  };

  const setScrollTop = (value: number) => {
    if (selector) {
      const el = document.querySelector<HTMLElement>(selector);
      if (el) {
        el.scrollTo({ top: value, behavior });
        return true;
      }
      return false;
    }
    window.scrollTo({ top: value, behavior });
    return true;
  };

  // atualiza posições enquanto o usuário faz scroll (debounced via rAF)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const key = currentKeyRef.current;
        if (key) {
          positionsRef.current.set(key, getScrollTop());
        }
        ticking = false;
      });
    };

    // ouvir scroll no container ou window
    const container = selector ? document.querySelector(selector) : window;
    container?.addEventListener?.("scroll", onScroll, { passive: true });

    return () => {
      container?.removeEventListener?.("scroll", onScroll as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);

  // ao montar, tentar definir scrollRestoration para manual (se aplicável)
  useEffect(() => {
    if ("scrollRestoration" in history) {
      try {
        history.scrollRestoration = "manual";
      } catch {
        // ignorar se não permitido
      }
    }
  }, []);

  // quando a rota muda, decidir restaurar ou ir para topo
  useLayoutEffect(() => {
    const newKey = makeEntryKey(location);

    // salvar posição da rota anterior (garantir última amostragem)
    const prevKey = currentKeyRef.current;
    if (prevKey) {
      positionsRef.current.set(prevKey, getScrollTop());
    }

    currentKeyRef.current = newKey;

    const restoreOrTop = () => {
      // se navegação via histórico (voltar/avançar) -> restaurar se existir
      if (navigationType === "POP") {
        const saved = positionsRef.current.get(newKey);
        if (typeof saved === "number") {
          // tenta restaurar, mas aguarda conteúdo carregar se necessário
          const tryRestore = (attempts = 0) => {
            const el = selector ? document.querySelector<HTMLElement>(selector) : null;
            const scrollHeight = el ? el.scrollHeight : document.documentElement.scrollHeight || document.body.scrollHeight;
            const viewport = el ? el.clientHeight : window.innerHeight;

            const enoughContent = scrollHeight >= saved + Math.min(100, viewport * 0.5);

            if (enoughContent || attempts >= maxAttempts) {
              setScrollTop(saved);
              return;
            }

            // tenta novamente após intervalo
            window.setTimeout(() => tryRestore(attempts + 1), attemptInterval);
          };

          tryRestore(0);
          return;
        }
      }

      // caso contrário (PUSH/REPLACE) ou sem posição salva -> ir para topo
      setScrollTop(0);
    };

    // tentativa imediata: se container não existe, tentamos novamente algumas vezes (útil quando há animação / lazy load)
    if (selector) {
      const el = document.querySelector<HTMLElement>(selector);
      if (el) {
        restoreOrTop();
      } else {
        // tentar localizar o container algumas vezes antes de desistir
        let attempts = 0;
        const id = window.setInterval(() => {
          attempts += 1;
          const e = document.querySelector<HTMLElement>(selector);
          if (e || attempts >= maxAttempts) {
            restoreOrTop();
            window.clearInterval(id);
          }
        }, attemptInterval);
      }
    } else {
      // window sempre disponível
      restoreOrTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, location.pathname, navigationType, selector]);

  return null;
}

