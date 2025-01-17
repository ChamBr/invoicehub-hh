export interface ProductTables {
  products: {
    Row: {
      created_at: string
      description: string | null
      id: string
      name: string
      price: number
      sku: string | null
      status: string | null
      stock: number | null
      type: string
    }
    Insert: {
      created_at?: string
      description?: string | null
      id?: string
      name: string
      price: number
      sku?: string | null
      status?: string | null
      stock?: number | null
      type: string
    }
    Update: {
      created_at?: string
      description?: string | null
      id?: string
      name?: string
      price?: number
      sku?: string | null
      status?: string | null
      stock?: number | null
      type?: string
    }
  }
}