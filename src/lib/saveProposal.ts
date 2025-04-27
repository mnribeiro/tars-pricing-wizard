
import { supabase } from "@/integrations/supabase/client";
import { CalculatorState, Proposal } from "@/types/interfaces";
import { calculateTotalPrice } from "@/types/calculator";

export async function saveProposal(state: CalculatorState): Promise<{ success: boolean; error?: string }> {
  try {
    const totalPrice = calculateTotalPrice(state);
    
    const proposal: Omit<Proposal, 'id'> = {
      client_name: state.clientName,
      company_name: state.companyName,
      client_phone: state.clientPhone,
      project_description: state.projectDescription,
      initial_idea: state.initialIdea,
      selected_segment: state.selectedSegment || '',
      selected_subniche: state.selectedSubNiche || '',
      selected_department: state.selectedDepartment || '',
      niche_units: state.nicheUnits,
      industry_area: state.selectedIndustryArea || '',
      whatsapp_numbers: state.whatsappNumbers,
      objectives: state.selectedObjectives,
      ai_level: state.selectedAILevel || '',
      ai_features: state.selectedAIFeatures,
      ai_training: state.selectedAITraining || '',
      ai_tools: state.selectedAITools,
      selected_modules: state.selectedModules,
      notes: state.notes,
      discount: state.discount,
      implementation_price: totalPrice.implementation,
      monthly_price: totalPrice.monthly
    };

    const { error } = await supabase
      .from('proposals')
      .insert([proposal]);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error saving proposal:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}
