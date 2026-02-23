-- AI Книга: Initial Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Дети
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  name TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  age INTEGER NOT NULL CHECK (age BETWEEN 1 AND 12),
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Заказы
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  email TEXT,
  selected_traits TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'preview_pending'
    CHECK (status IN (
      'preview_pending', 'preview_generating', 'preview_ready',
      'pending_payment', 'paid', 'generating', 'ready', 'downloaded', 'failed'
    )),
  preview_images TEXT[] DEFAULT '{}',
  generated_images TEXT[] DEFAULT '{}',
  pdf_url TEXT,
  payment_id TEXT,
  amount INTEGER,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Индексы
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_children_session ON children(session_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS (открытый для Phase 1)
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "children_open" ON children FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_open" ON orders FOR ALL USING (true) WITH CHECK (true);
