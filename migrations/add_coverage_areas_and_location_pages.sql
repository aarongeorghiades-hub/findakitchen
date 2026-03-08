-- Add coverage_areas column to providers table
ALTER TABLE providers ADD COLUMN IF NOT EXISTS coverage_areas TEXT[] DEFAULT '{}';

-- Seed all active providers with all 15 cities (UK-wide coverage)
UPDATE providers
SET coverage_areas = ARRAY['london','manchester','birmingham','leeds','bristol','sheffield','edinburgh','glasgow','liverpool','nottingham','cardiff','leicester','coventry','newcastle','brighton']
WHERE active = true;

-- Insert seo_pages entries for all 15 location pages
INSERT INTO seo_pages (slug, page_type, title, meta_description, market_segment, target_keyword, published, content)
VALUES
  ('locations/london', 'landing', 'Temporary Kitchen Hire London | FindAKitchen', 'Compare temporary kitchen hire providers covering London. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire London', true, ''),
  ('locations/manchester', 'landing', 'Temporary Kitchen Hire Manchester | FindAKitchen', 'Compare temporary kitchen hire providers covering Manchester. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Manchester', true, ''),
  ('locations/birmingham', 'landing', 'Temporary Kitchen Hire Birmingham | FindAKitchen', 'Compare temporary kitchen hire providers covering Birmingham. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Birmingham', true, ''),
  ('locations/leeds', 'landing', 'Temporary Kitchen Hire Leeds | FindAKitchen', 'Compare temporary kitchen hire providers covering Leeds. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Leeds', true, ''),
  ('locations/bristol', 'landing', 'Temporary Kitchen Hire Bristol | FindAKitchen', 'Compare temporary kitchen hire providers covering Bristol. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Bristol', true, ''),
  ('locations/sheffield', 'landing', 'Temporary Kitchen Hire Sheffield | FindAKitchen', 'Compare temporary kitchen hire providers covering Sheffield. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Sheffield', true, ''),
  ('locations/edinburgh', 'landing', 'Temporary Kitchen Hire Edinburgh | FindAKitchen', 'Compare temporary kitchen hire providers covering Edinburgh. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Edinburgh', true, ''),
  ('locations/glasgow', 'landing', 'Temporary Kitchen Hire Glasgow | FindAKitchen', 'Compare temporary kitchen hire providers covering Glasgow. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Glasgow', true, ''),
  ('locations/liverpool', 'landing', 'Temporary Kitchen Hire Liverpool | FindAKitchen', 'Compare temporary kitchen hire providers covering Liverpool. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Liverpool', true, ''),
  ('locations/nottingham', 'landing', 'Temporary Kitchen Hire Nottingham | FindAKitchen', 'Compare temporary kitchen hire providers covering Nottingham. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Nottingham', true, ''),
  ('locations/cardiff', 'landing', 'Temporary Kitchen Hire Cardiff | FindAKitchen', 'Compare temporary kitchen hire providers covering Cardiff. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Cardiff', true, ''),
  ('locations/leicester', 'landing', 'Temporary Kitchen Hire Leicester | FindAKitchen', 'Compare temporary kitchen hire providers covering Leicester. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Leicester', true, ''),
  ('locations/coventry', 'landing', 'Temporary Kitchen Hire Coventry | FindAKitchen', 'Compare temporary kitchen hire providers covering Coventry. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Coventry', true, ''),
  ('locations/newcastle', 'landing', 'Temporary Kitchen Hire Newcastle | FindAKitchen', 'Compare temporary kitchen hire providers covering Newcastle. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Newcastle', true, ''),
  ('locations/brighton', 'landing', 'Temporary Kitchen Hire Brighton | FindAKitchen', 'Compare temporary kitchen hire providers covering Brighton. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.', 'domestic', 'temporary kitchen hire Brighton', true, '')
ON CONFLICT (slug) DO NOTHING;
