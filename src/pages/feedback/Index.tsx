import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const FeedbackIndex = () => {
  const { data: feedbacks, isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select(`
          *,
          customer:customers(name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Feedback</h1>
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left">Cliente</th>
                  <th className="px-6 py-3 text-left">Tipo</th>
                  <th className="px-6 py-3 text-left">Título</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Prioridade</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks?.map((feedback) => (
                  <tr key={feedback.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{feedback.customer?.name}</td>
                    <td className="px-6 py-4">{feedback.type}</td>
                    <td className="px-6 py-4">{feedback.title}</td>
                    <td className="px-6 py-4">{feedback.status}</td>
                    <td className="px-6 py-4">{feedback.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackIndex;