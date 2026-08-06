/**
 * Step 217: Individual PDF Pay-slip Generator
 * Step 218: Pay-slip Template Design (via HTML string for PDF)
 */

export interface PayslipData {
  workerName: string;
  workerCode: string;
  period: string; // e.g., "Aug 2026"
  basicSalary: number;
  overtimePay: number;
  grossPay: number;
  deductions: number;
  advanceCut: number;
  netPayable: number;
  payRate: number;
  regularHours: number;
  overtimeHours: number;
}

/**
 * Step 218: Pay-slip Template Design (HTML for PDF)
 */
export function generatePayslipHTML(data: PayslipData): string {
  return `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1D0B2E; padding: 24px;">
    <div style="background: #1D0B2E; color: white; padding: 16px; text-align: center;">
      <h1 style="margin:0; color: #E5B84B;">iNAYATechLab Inc.</h1>
      <p style="margin:0; color: #B388FF;">Pay Slip - ${data.period}</p>
    </div>
    <div style="margin-top: 16px;">
      <p><strong>Worker:</strong> ${data.workerName} (${data.workerCode})</p>
      <p><strong>Pay Rate:</strong> $${data.payRate}/hr</p>
      <table style="width:100%; border-collapse: collapse; margin-top: 12px;">
        <tr style="background: #2A1143; color: white;"><th style="padding:8px; text-align:left;">Description</th><th style="padding:8px; text-align:right;">Amount</th></tr>
        <tr><td style="padding:8px; border-bottom: 1px solid #eee;">Basic (${data.regularHours}h x $${data.payRate})</td><td style="padding:8px; text-align:right;">$${data.basicSalary.toFixed(2)}</td></tr>
        <tr><td style="padding:8px; border-bottom: 1px solid #eee;">Overtime (${data.overtimeHours}h)</td><td style="padding:8px; text-align:right;">$${data.overtimePay.toFixed(2)}</td></tr>
        <tr style="font-weight:bold; background: #E5B84B20;"><td style="padding:8px;">Gross Pay</td><td style="padding:8px; text-align:right;">$${data.grossPay.toFixed(2)}</td></tr>
        <tr><td style="padding:8px; color: #EF4444;">Deductions</td><td style="padding:8px; text-align:right; color: #EF4444;">-$${data.deductions.toFixed(2)}</td></tr>
        <tr><td style="padding:8px; color: #EF4444;">Advance Cut</td><td style="padding:8px; text-align:right; color: #EF4444;">-$${data.advanceCut.toFixed(2)}</td></tr>
        <tr style="font-weight:bold; background: #1D0B2E; color: white;"><td style="padding:12px;">Net Payable</td><td style="padding:12px; text-align:right; color: #E5B84B;">$${data.netPayable.toFixed(2)}</td></tr>
      </table>
      <p style="margin-top: 16px; font-size: 12px; color: #666; text-align: center;">This is a computer generated payslip. No signature required.</p>
      <p style="font-size: 10px; color: #999; text-align: center;">Generated: ${new Date().toISOString()} | iNAYATechLab Manpower SaaS v1.9.0</p>
    </div>
  </div>
  `;
}

/**
 * Step 217: Generate Payslip PDF (simulated - returns HTML, in prod use puppeteer/pdf-lib)
 */
export function generatePayslipPDF(data: PayslipData): { html: string; filename: string } {
  const html = generatePayslipHTML(data);
  const filename = `payslip_${data.workerCode}_${data.period.replace(/\s+/g, "_")}.pdf`;
  // In prod: use puppeteer to convert html to pdf buffer
  return { html, filename };
}
