interface TitleSectionsProps {
    title: string;
    description: string;
}

export default function TitleSections({ title, description }: TitleSectionsProps) {
    return (
        <div>
            <h2 className="title-sections">{title}</h2>
            <p className="description-sections">{description}</p>
        </div>
    )
}