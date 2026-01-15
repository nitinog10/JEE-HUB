import { useState } from 'react'
import { FiDownload, FiFileText, FiCalendar, FiFilter } from 'react-icons/fi'

const papers = [
  { id: 1, title: 'JEE Main 2025 - January Session', year: 2025, type: 'JEE Main', subjects: ['Physics', 'Chemistry', 'Maths'] },
  { id: 2, title: 'JEE Main 2024 - April Session', year: 2024, type: 'JEE Main', subjects: ['Physics', 'Chemistry', 'Maths'] },
  { id: 3, title: 'JEE Advanced 2024 - Paper 1', year: 2024, type: 'JEE Advanced', subjects: ['Physics', 'Chemistry', 'Maths'] },
  { id: 4, title: 'JEE Advanced 2024 - Paper 2', year: 2024, type: 'JEE Advanced', subjects: ['Physics', 'Chemistry', 'Maths'] },
  { id: 5, title: 'JEE Main 2023 - January Session', year: 2023, type: 'JEE Main', subjects: ['Physics', 'Chemistry', 'Maths'] },
  { id: 6, title: 'JEE Advanced 2023 - Paper 1', year: 2023, type: 'JEE Advanced', subjects: ['Physics', 'Chemistry', 'Maths'] },
]

const samplePapers = [
  { id: 101, title: 'Physics - Electrostatics Sample', subject: 'Physics', pages: 15 },
  { id: 102, title: 'Chemistry - Organic Reactions', subject: 'Chemistry', pages: 20 },
  { id: 103, title: 'Maths - Integration Practice', subject: 'Maths', pages: 18 },
  { id: 104, title: 'Full Syllabus Sample Test', subject: 'All', pages: 45 },
]

export default function Papers() {
  const [tab, setTab] = useState('pyq')
  const [yearFilter, setYearFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const filteredPapers = papers.filter(p => 
    (yearFilter === 'All' || p.year.toString() === yearFilter) &&
    (typeFilter === 'All' || p.type === typeFilter)
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Question Papers</h1>
        <p className="text-gray-500">Access previous year papers and sample papers</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button onClick={() => setTab('pyq')}
          className={`px-6 py-3 font-medium transition-colors ${tab === 'pyq' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
          Previous Year Papers
        </button>
        <button onClick={() => setTab('sample')}
          className={`px-6 py-3 font-medium transition-colors ${tab === 'sample' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
          Sample Papers
        </button>
      </div>

      {tab === 'pyq' ? (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-gray-400" />
              <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option value="All">All Years</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-400" />
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option value="All">All Types</option>
                <option value="JEE Main">JEE Main</option>
                <option value="JEE Advanced">JEE Advanced</option>
              </select>
            </div>
          </div>

          {/* Papers List */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredPapers.map(paper => (
              <div key={paper.id} className="card flex items-start gap-4">
                <div className="p-3 bg-primary-100 rounded-lg"><FiFileText className="text-primary-600" size={24} /></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{paper.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {paper.subjects.map(s => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{s}</span>
                    ))}
                  </div>
                </div>
                <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                  <FiDownload size={20} />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {samplePapers.map(paper => (
            <div key={paper.id} className="card flex items-start gap-4">
              <div className="p-3 bg-accent-100 rounded-lg"><FiFileText className="text-accent-600" size={24} /></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{paper.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{paper.pages} pages • {paper.subject}</p>
              </div>
              <button className="p-2 text-accent-600 hover:bg-accent-50 rounded-lg transition-colors">
                <FiDownload size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
