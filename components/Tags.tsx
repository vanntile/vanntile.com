interface Props {
  tags: string[]
  additionalClasses?: string
  className?: string
}

const Tags: React.FC<Props> = ({ tags, additionalClasses, className }): JSX.Element => (
  <div className={`mt-1 pb-4 overflow-hidden flex flex-row flex-wrap space-x-2 ${className}`}>
    {tags.map((s: string) => (
      <span key={s} className={`px-4 py-2 whitespace-nowrap text-sm font-semibold rounded ${additionalClasses}`}>
        {s}
      </span>
    ))}
  </div>
)

export default Tags
