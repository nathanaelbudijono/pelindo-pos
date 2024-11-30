import { REPORT_API_KEY } from "../../constant/env";
import { getReportResponseProps } from "../../types/report-types";

export const getReport = async (): Promise<getReportResponseProps> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${REPORT_API_KEY}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: res.ok,
        status: res.status,
        report: data,
      };
    } else {
      const errorText = await res.text();
      return {
        success: res.ok,
        status: res.status,
        error: errorText,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      status: 500,
      error: "Internal Server Error",
    };
  }
};
