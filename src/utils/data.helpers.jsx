import { unixToUtc } from "@/utils/time.helpers";

export const handleChartData = async (rawData) => {
  let data = [];
  rawData?.map((item) => {
    const newTime = unixToUtc(item.CreationDate.S);
    const newTemp = Math.round(item.payload.M.temp.N * 10) / 10;
    const newHum = Math.round(item.payload.M.hum.N * 10) / 10;
    data.push({
      name: newTime,
      temperatuur: newTemp,
      luchtvochtigheid: newHum,
    });
  });
  return data;
};
