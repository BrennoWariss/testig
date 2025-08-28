import { formatNumber2 } from "@/utils/format";
import type { ConversionResult } from "@/models/currency";

export function ResultBox({ data }: { data?: ConversionResult }) {
  if (!data) return null;
  const { request, rate, result } = data;
  return (
    <div className="result" role="status" aria-live="polite">
      <div>
        Rate: 1 {request.from} = {formatNumber2(rate)} {request.to}
        {request.date ? ` (em ${request.date})` : ""}
      </div>
      <div>
        Result: {formatNumber2(request.amount)} {request.from} → {formatNumber2(result)} {request.to}
      </div>
    </div>
  );
}

