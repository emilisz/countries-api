export const reducer = (state: any, action: any) => {

  if (action.type === "SET FILTERED DATA") {
    return { ...state, filteredData: action.payload.sortedArray, defaultOrder: action.payload.order };
  }

  if (action.type === "RESET") {
    return { ...state, filteredData: state.data, selectedRegion: "", selectedArea: "999999999", defaultOrder: "desc" };
  }

  if (action.type === "SET REGIONS NAMES") {
    return { ...state, regions: action.payload };
  }

  if (action.type === "INITIAL DATA SET") {
    const initialData = action.payload.cData;
    return { ...state, data: initialData, filteredData: initialData };
  }

  if (action.type === "CHANGE REGION") {
    return { ...state, selectedRegion: action.payload };
  }

  if (action.type === "CHANGE AREA") {
    return { ...state, selectedArea: action.payload };
  }

  throw new Error(`Type "${action.type}" not found`);
};
