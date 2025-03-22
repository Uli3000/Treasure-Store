import ResourceCard from "./ResourceCard"
import type { Resource } from "../types"

interface ResourceGridProps {
  resources: Resource[]
  toggleFavorite: (id: string, currentFavorite: boolean) => void
}

const ResourceGrid = ({ resources, toggleFavorite }: ResourceGridProps) => {
  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-8">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">No hay recursos</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          No se encontraron recursos que coincidan con tu búsqueda. Intenta con otros términos o añade un nuevo recurso.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} toggleFavorite={toggleFavorite} />
      ))}
    </div>
  )
}

export default ResourceGrid

