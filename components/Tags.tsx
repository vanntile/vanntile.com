interface Props {
  tags: string[]
  additionalClasses?: string
  className?: string
}

const Tags: React.FC<Props> = ({ tags, additionalClasses, className }): JSX.Element => (
  <div className={`pb-4 ${className}`}>
    {tags.map((s: string) => (
      <span className={`mx-1 px-4 py-2 text-sm font-semibold rounded ${additionalClasses}`}>{s}</span>
    ))}
  </div>
)

export default Tags
