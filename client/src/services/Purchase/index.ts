import { FormDataPurchase } from "@/store/purchaseStore";
import http from "../httpService";
import { DateRangeType } from "@/store/globalStore";

interface AddPurchasePorps extends FormDataPurchase {
  party_id: string;
  order_id: string;
}

export async function addPurchaseDataApi(req: AddPurchasePorps) {
  const { data } = await http.post(`/purchase/add`, req);
  return data;
}

export async function getPartyWisePuchaseDataApi(
  partyId: string,
  selectedDateRange: DateRangeType
) {
  const { data } = await http.get(
    `/purchase/party-wise?party_id=${partyId}&startDate=${selectedDateRange.startDate}&endDate=${selectedDateRange.endDate}`
  );
  return data;
}

export async function deletePartyPuchaseDataApi(req: any) {
  const { purchase_id } = req;

  const { data } = await http.post(
    `/purchase/delete-purchase?purchase_id=${purchase_id}`,
    req
  );
  return data;
}

export async function getPartyPurchaseOrderDetailsDataApi(req: any) {
  const { order_id, party_id } = req.original;

  const { data } = await http.get(
    `/purchase/party-order-details?order_id=${order_id}&party_id=${party_id}`
  );
  return data;
}
