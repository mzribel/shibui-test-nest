import { Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { SupabaseTemplateRepository } from './repositories/supabase-template.repository';

@Global()
@Module({
  providers: [
    SupabaseService,
    SupabaseTemplateRepository,
    {
      provide: 'ITemplateRepository',
      useClass: SupabaseTemplateRepository,
    },
  ],
  exports: [
    SupabaseService,
    'ITemplateRepository',
  ],
})
export class SupabaseModule {}