import { useState } from "react"
import { ChevronRight, FolderIcon } from "lucide-react"
import type { Category } from "../types"

interface SidebarProps {
  categories: Category[]
  selectedCategory: string | null
  selectedSubcategory: string | null
  setSelectedCategory: (categoryId: string | null) => void
  setSelectedSubcategory: (subcategoryId: string | null) => void
}

const Sidebar = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  setSelectedCategory,
  setSelectedSubcategory,
}: SidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => ({ ...acc, [category.id]: false }), {}),
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId],
    })
  }

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
      setSelectedSubcategory(null)
    } else {
      setSelectedCategory(categoryId)
      setSelectedSubcategory(null)
 
      setExpandedCategories({
        ...expandedCategories,
        [categoryId]: true,
      })
    }
  }

  const handleSubcategoryClick = (subcategoryId: string) => {
    if (selectedSubcategory === subcategoryId) {
      setSelectedSubcategory(null)
    } else {
      setSelectedSubcategory(subcategoryId)
    }
  }

  return (
    <aside className="w-56 h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex gap-2">
          <img src="./TreasureStore.png" width={30} height={30}></img>
          <h1 className="text-lg font-medium text-teal-600 dark:text-teal-400">TreasureStore</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <div className="px-3">
            <h2 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Categorías
            </h2>
            <ul className="mt-2 space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <div className="space-y-1">
                    <button
                      className={`w-full flex items-center justify-between px-2 py-1.5 text-sm rounded-md ${
                        selectedCategory === category.id
                          ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <div className="flex items-center">
                        <FolderIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                        <span>{category.name}</span>
                      </div>
                      {category.subcategories.length > 0 && (
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            expandedCategories[category.id] ? "rotate-90" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleCategory(category.id)
                          }}
                        />
                      )}
                    </button>

                    {expandedCategories[category.id] && category.subcategories.length > 0 && (
                      <ul className="pl-6 space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory.id}>
                            <button
                              className={`w-full flex items-center px-2 py-1.5 text-sm rounded-md ${
                                selectedSubcategory === subcategory.id
                                  ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
                                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                              onClick={() => handleSubcategoryClick(subcategory.id)}
                            >
                              {subcategory.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar

