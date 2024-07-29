import http from "../httpService";

export async function getPartyReturnDataApi(partyId: string) {
  const { data } = await http.get(`/return/party-wise?party_id=${partyId}`);
  return data;
}

export async function addPartyReturnDataApi(req: any) {
  const { party_id } = req;
  const { data } = await http.post(`/return/add?party_id=${party_id}`, req);
  return data;
}

export async function deletePartyReturnDataApi(reqestedData: any) {
  const { data } = await http.post(`/return/delete`, reqestedData);
  return data;
}
