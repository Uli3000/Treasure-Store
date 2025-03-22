import { useState } from "react"
import { ExternalLink, Heart, Tag } from "lucide-react"
import type { Resource } from "../types"

interface ResourceCardProps {
  resource: Resource
  toggleFavorite: (id: string, currentFavorite: boolean) => void
}

const ResourceCard = ({ resource, toggleFavorite }: ResourceCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div
      className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40">
        <img
          src={resource.preview_image || "/placeholder.svg"}
          alt={resource.title}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-80"
          }`}
        >
          <h3 className="text-white font-medium text-lg line-clamp-2">{resource.title}</h3>
        </div>
        <button
          onClick={() => toggleFavorite(resource.id, resource.isFavorite)}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        >
          <Heart className={`w-5 h-5 ${resource.isFavorite ? "text-red-500 fill-red-500" : "text-white"}`} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{resource.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              +{resource.tags.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between ">
          <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(resource.createdAt)}</span>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Visitar <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ResourceCard

