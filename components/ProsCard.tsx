const ProsCard = ({ title, pros }: { title: string; pros: string[] }): JSX.Element => (
  <div className="w-full px-6 pt-4 pb-2 my-4 border border-green-200 rounded dark:border-green-900 bg-green-50 dark:bg-green-800 dark:text-gray-100">
    <span>{`You might use ${title} if...`}</span>
    <div className="mt-4">
      {pros.map((pro) => (
        <div key={pro} className="flex items-baseline mb-2 font-medium">
          <div className="w-4 h-4 pt-0.5 mr-2">
            <svg className="w-4 h-4 text-green-500 dark:text-green-300" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </g>
            </svg>
          </div>
          <span>{pro}</span>
        </div>
      ))}
    </div>
  </div>
)

export default ProsCard
