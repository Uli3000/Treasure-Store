export interface Resource {
  id: string
  title: string
  description: string
  url: string
  preview_image: string
  category_id: string
  subcategory_id: string | null
  tags: string[]
  createdAt: Date
  isFavorite: boolean
}

export interface Category {
  id: string
  name: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
}

