import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export default function Date({ dateString }: { dateString: string }): JSX.Element {
  return <time dateTime={dateString}>{format(parseISO(dateString), 'LLLL d, yyyy')}</time>
}
