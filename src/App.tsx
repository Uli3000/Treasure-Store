import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import type { Resource, Category } from "./types"
import ResourceGrid from "./components/ResourceGrid"
import { supabase } from "./supabaseClient"
import { fetchCategories, fetchResources } from "./services/categoriesService"

function App() {
  const [resources, setResources] = useState<Resource[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all")

  useEffect(() => {
    const loadData = async () => {
      const categoriesFromDB = await fetchCategories();
      const resourcesFromDB = await fetchResources();

      setCategories(categoriesFromDB);
      setResources(resourcesFromDB);
    };

    loadData();
  }, []);

  const toggleFavorite = async (id: string, currentFavorite: boolean) => {
    // Actualizar el estado localmente primero
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id ? { ...resource, isFavorite: !currentFavorite } : resource
      )
    );
  
    // Guardar en la base de datos
    const { error } = await supabase
      .from("resources")
      .update({ is_favorite: !currentFavorite }) 
      .eq("id", id);
  
    if (error) {
      console.error("Error actualizando favorito en Supabase:", error);
      // Si hay error, revertimos el cambio en el estado local
      setResources((prevResources) =>
        prevResources.map((resource) =>
          resource.id === id ? { ...resource, isFavorite: currentFavorite } : resource
        )
      );
    }
  };  

  const filteredResources = resources.filter((resource) => {
    if (activeTab === "favorites" && !resource.isFavorite) {
      return false
    }

    if (selectedCategory && resource.category_id !== selectedCategory) {
      return false
    }
    if (selectedSubcategory && resource.subcategory_id !== selectedSubcategory) {
      return false
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    return true
  })

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="px-6 py-4 flex-1 overflow-auto">
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "all"
                  ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
                  : "text-gray-600 hover:text-teal-700 dark:text-gray-300 dark:hover:text-teal-300"
              }`}
              onClick={() => setActiveTab("all")}
            >
              Todos
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "favorites"
                  ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
                  : "text-gray-600 hover:text-teal-700 dark:text-gray-300 dark:hover:text-teal-300"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Favoritos
            </button>
          </div>
          <main>
            <Routes>
              <Route
                path="/"
                element={<ResourceGrid resources={filteredResources} toggleFavorite={toggleFavorite} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App

