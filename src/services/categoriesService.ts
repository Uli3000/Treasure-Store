import { supabase } from "../supabaseClient";

export const fetchCategories = async () => {
    const { data: categoriesData, error: categoriesError } = await supabase.from("categories").select("*");
  
    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      return [];
    }
  
    const { data: subcategoriesData, error: subcategoriesError } = await supabase.from("subcategories").select("*");
  
    if (subcategoriesError) {
      console.error("Error fetching subcategories:", subcategoriesError);
      return [];
    }
  
    return categoriesData.map(category => ({
      ...category,
      subcategories: subcategoriesData.filter(sub => sub.category_id === category.id),
    }));
  };

export const fetchResources = async () => {
    const { data, error } = await supabase.from("resources").select("*");
  
    if (error) {
      console.error("Error fetching resources:", error);
      return [];
    }
  
    return data.map(resource => ({
      ...resource,
      isFavorite: resource.is_favorite
    }));
  };