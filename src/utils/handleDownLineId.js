export const handleDownLineId = (
  setModal,
  downLineId,
  setDownLineId,
  payloadRole,
  setPayloadRole,
  setId,
  id
) => {
  setModal((prev) => !prev);
  setDownLineId("");
  setDownLineId(downLineId);
  setPayloadRole(payloadRole);
  setId(id);
};
