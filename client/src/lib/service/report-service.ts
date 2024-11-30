import { getReportResponseProps } from "../../types/report-types";
import { getReport } from "../fetcher/report-fetcher";

export const getReportService =
  async (): Promise<getReportResponseProps | null> => {
    try {
      const data = await getReport();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
