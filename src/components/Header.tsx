import { Search, Moon, Sun } from "lucide-react"
import { useDarkMode } from "../hooks/useDarkMode"

interface HeaderProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex-1 max-w-2xl">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-md focus:ring-1 focus:ring-teal-500 dark:focus:ring-teal-400 text-gray-900 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center ml-4 space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

