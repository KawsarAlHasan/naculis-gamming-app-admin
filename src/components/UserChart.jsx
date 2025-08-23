import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
} from "recharts";

const UserChart = ({ trandsData }) => {
  const data = trandsData?.months?.map((m, i) => ({
    month: m.slice(0, 3),
    value: trandsData?.user_counts[i],
    xp: trandsData?.xp_trends[i],
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#569117",
            border: "1px solid #ccc",
            padding: "5px",
          }}
        >
          <p>
            <strong>{label}</strong>
          </p>
          <p>{`value: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-[470px] rounded-lg border-[1px] border-[#7ED321]">
      <h2 className="text-[24px] font-semibold pl-[40px] my-7">User</h2>
      <div className="h-[380px] mt-5 mr-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: "14px", fill: "#F3F3F3" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#F3F3F3" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#7ED321"
              strokeWidth={3}
              dot={{ fill: "#7ED321", r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserChart;
