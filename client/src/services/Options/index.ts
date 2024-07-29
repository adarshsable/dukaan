import http from "../httpService";

interface CompanyCategoryReq {
  company: string;
  category: string;
}

interface ProductReq extends CompanyCategoryReq {
  product: string;
}

// add company & category
export async function addCompanyAndCategoryDataApi(req: CompanyCategoryReq) {
  const { data } = await http.post(`/identity/add-company-category`, req);
  return data;
}

// add product with category & company data
export async function addProductDataApi(req: ProductReq) {
  const { data } = await http.post(`/product/add-product-details`, req);
  return data;
}

// all product with category & company data
export async function getAllOptionsDataApi() {
  const { data } = await http.get(`/identity/all-categories-options`);
  return data;
}

// all product with category & company data
export async function getAllProductDataApi() {
  const { data } = await http.get(`/product/all-products-details`);
  return data;
}
