import { Tables } from './tables';
import { Enums } from './enums';

export interface Database {
  public: {
    Tables: Tables;
    Views: {
      [_ in never]: never;
    };
    Functions: {
      clean_test_data: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      is_debug_mode_valid: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: Enums;
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type { Tables, Enums };