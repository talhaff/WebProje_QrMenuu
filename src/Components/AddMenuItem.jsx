import { useState } from 'react';

function AddMenuItem({ onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Ana Yemek');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(''); // Yeni: Resim state'i

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: name,
      category: category,
      price: Number(price),
      // Eğer resim linki girilmezse varsayılan bir görsel ata:
      image: image || "https://placehold.co/600x400?text=Gorsel+Yok" 
    };

    onAdd(newItem);
    setName('');
    setCategory('Ana Yemek');
    setPrice('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-bold">Ürün Adı</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Örn: Lahmacun" required />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Kategori</label>
        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Ana Yemek">Ana Yemek</option>
          <option value="Ara Sıcak">Ara Sıcak</option>
          <option value="Tatlı">Tatlı</option>
          <option value="İçecek">İçecek</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Fiyat (₺)</label>
        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Örn: 150" required />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Görsel Linki (Opsiyonel)</label>
        <input type="url" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
      </div>
      <button type="submit" className="btn btn-primary w-100 fw-bold">Menüye Ekle</button>
    </form>
  );
}

export default AddMenuItem;