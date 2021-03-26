interface Props {
  tags: string[]
  additionalClasses?: string
  className?: string
}

const Tags: React.FC<Props> = ({ tags, additionalClasses, className }): JSX.Element => (
  <div className={`pb-4 w-full overflow-hidden flex flex-row flex-wrap gap-2 ${className}`}>
    {tags.map((s: string) => (
      <span className={`px-4 py-2 whitespace-nowrap text-sm font-semibold rounded ${additionalClasses}`}>{s}</span>
    ))}
  </div>
)

export default Tags
