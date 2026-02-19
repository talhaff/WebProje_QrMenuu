import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initialMenu } from './Interfaces/MenuData';
import AddMenuItem from './Components/AddMenuItem';

function App() {
  const [menuItems, setMenuItems] = useState(() => {
    const savedMenu = localStorage.getItem('qrMenuDataV6');
    return savedMenu ? JSON.parse(savedMenu) : initialMenu;
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', category: '', price: '', image: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tümü');
  
  // YENİ: Yönetici modunu kontrol eden state (Varsayılan: Müşteri görünümü / false)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('qrMenuDataV6', JSON.stringify(menuItems));
  }, [menuItems]);

  const handleAddItem = (newItem) => {
    setMenuItems([...menuItems, newItem]);
    setShowAddModal(false);
  };

  const handleDeleteItem = (id) => setMenuItems(menuItems.filter(item => item.id !== id));

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditForm({ name: item.name, category: item.category, price: item.price, image: item.image || '' });
  };

  const handleSaveUpdate = (id) => {
    const updatedMenu = menuItems.map(item => 
      item.id === id ? { ...item, ...editForm, price: Number(editForm.price) } : item
    );
    setMenuItems(updatedMenu);
    setEditingId(null);
  };

  // YENİ: Yönetici Giriş/Çıkış Fonksiyonu
  const handleAdminToggle = () => {
    if (isAdmin) {
      // Eğer zaten adminse, çıkış yap (müşteri moduna dön)
      setIsAdmin(false);
      setEditingId(null); // Açık düzenleme varsa kapat
    } else {
      // Admin değilse şifre sor
      const password = prompt("Yönetici panelini açmak için şifreyi girin (Şifre: 1234):");
      if (password === "1234") {
        setIsAdmin(true);
      } else if (password !== null) {
        alert("Hatalı şifre! Yönetici moduna geçilemedi.");
      }
    }
  };

  const filteredItems = activeCategory === 'Tümü' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const filterOptions = ['Tümü', 'Ana Yemek', 'Ara Sıcak', 'Tatlı', 'İçecek'];

  return (
    <div className="bg-light min-vh-100 pb-5">
      
      {/* Üst Navigasyon Çubuğu (Rengini hafif lacivert-antrasit yaptık) */}
      <nav className="navbar navbar-dark shadow-sm mb-4 py-3 sticky-top" style={{ backgroundColor: '#2c2b41' }}>
        <div className="container-xl d-flex justify-content-between align-items-center">
          
          {/* ÖzCan Logo ve İsim Alanı */}
          <span className="navbar-brand mb-0 h1 d-flex align-items-center">
            <div className="bg-white rounded-circle d-flex justify-content-center align-items-center me-3 shadow-sm" style={{ width: '60px', height: '60px', overflow: 'hidden' }}>
              <img 
                src="/son.jpeg"
                alt="ÖzCan Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>
            
            <span className="fw-bold fs-2" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px' }}>
              Öz<span style={{ color: '#1b10de' }}>Can</span>
            </span>
            <span className="ms-3 fs-6 text-white text-opacity-50 align-self-end mb-1 d-none d-md-inline">
              | Geleneksel Lezzet Durağı
            </span>
          </span>

          <div className="d-flex align-items-center gap-3">
            {/* SADECE ADMİNSE GÖRÜNEN YENİ ÜRÜN EKLE BUTONU */}
            {isAdmin && (
              <button onClick={() => setShowAddModal(true)} className="btn btn-primary fw-bold px-4 rounded-pill shadow-sm">
                + Yeni Ürün Ekle
              </button>
            )}
            
            {/* Yönetici Modu Geçiş Butonu (Kilit İkonlu) */}
            <button 
              onClick={handleAdminToggle} 
              className={`btn btn-sm rounded-pill px-3 fw-bold transition-all ${isAdmin ? 'btn-danger' : 'btn-outline-light opacity-50'}`}
              title={isAdmin ? "Müşteri Görünümüne Dön" : "Yönetici Girişi"}
            >
              {isAdmin ? '🔒 Çıkış Yap' : '⚙️ Yetkili'}
            </button>
          </div>
        </div>
      </nav>

      <div className="container-xl">
        {/* FİLTRELEME BUTONLARI */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {filterOptions.map(category => (
            <button 
              key={category} 
              onClick={() => setActiveCategory(category)}
              className={`btn rounded-pill px-4 fw-bold shadow-sm transition-all ${
                activeCategory === category 
                  ? 'btn-primary' 
                  : 'btn-white bg-white text-dark border-0'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* EKRAN BOŞSA */}
        {menuItems.length === 0 && (
          <div className="alert alert-white bg-white text-center rounded-4 border-0 shadow-sm p-5 mt-4">
            <h4 className="fw-bold mb-3 text-dark">Menü Şu An Boş</h4>
            {isAdmin 
              ? <p className="text-muted mb-4">Sağ üstteki "Yeni Ürün Ekle" butonunu kullanarak menünüzü oluşturmaya başlayın.</p>
              : <p className="text-muted mb-4">Restoranımız menüsünü güncelliyor, lütfen daha sonra tekrar deneyin.</p>
            }
          </div>
        )}

        {/* LİSTELEME ALANI */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filteredItems.map(item => (
            <div key={item.id} className="col">
              {editingId === item.id && isAdmin ? (
                /* DÜZENLEME MODU KARTI (SADECE ADMİNE AÇIK) */
                <div className="card h-100 border-0 shadow-lg rounded-4 bg-white p-3 z-3 position-relative">
                  <h6 className="fw-bold text-primary mb-3">Düzenleniyor: {item.name}</h6>
                  <input type="text" className="form-control form-control-sm mb-2" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} placeholder="Ürün Adı"/>
                  <select className="form-select form-select-sm mb-2" value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})}>
                    <option value="Ana Yemek">Ana Yemek</option>
                    <option value="Ara Sıcak">Ara Sıcak</option>
                    <option value="Tatlı">Tatlı</option>
                    <option value="İçecek">İçecek</option>
                  </select>
                  <div className="input-group input-group-sm mb-2">
                    <input type="number" className="form-control" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} placeholder="Fiyat"/>
                    <span className="input-group-text fw-bold bg-light">₺</span>
                  </div>
                  <input type="text" className="form-control form-control-sm mb-3" value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} placeholder="Görsel Linki"/>
                  <div className="d-flex gap-2 mt-auto">
                    <button onClick={() => handleSaveUpdate(item.id)} className="btn btn-sm btn-success w-50 fw-bold">Kaydet</button>
                    <button onClick={() => setEditingId(null)} className="btn btn-sm btn-secondary w-50 fw-bold">İptal</button>
                  </div>
                </div>
              ) : (
                /* NORMAL GÖRÜNÜM KARTI (MÜŞTERİ VE ADMİN ORTAK EKRANI) */
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" style={{ transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <span className="position-absolute top-0 start-0 m-3 badge bg-dark text-white rounded-pill px-3 py-2 opacity-75 shadow-sm">
                    {item.category}
                  </span>
                  <img 
                    src={item.image} 
                    className="card-img-top" 
                    style={{ height: '220px', objectFit: 'cover' }} 
                    alt={item.name} 
                  />
                  <div className="card-body d-flex flex-column p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold mb-0 pe-2 text-dark">{item.name}</h5>
                      <span className="text-success fw-bolder fs-5 text-nowrap">{item.price} ₺</span>
                    </div>
                    
                    {/* SADECE ADMİNSE GÖRÜNEN DÜZENLE/SİL BUTONLARI */}
                    {isAdmin && (
                      <div className="mt-auto pt-3 border-top d-flex gap-2">
                        <button onClick={() => handleEditClick(item)} className="btn btn-sm btn-light text-primary flex-fill fw-bold transition-all">Düzenle</button>
                        <button onClick={() => handleDeleteItem(item.id)} className="btn btn-sm btn-light text-danger flex-fill fw-bold transition-all">Sil</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* YENİ ÜRÜN EKLE MODALI */}
      {showAddModal && isAdmin && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, backdropFilter: 'blur(3px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-bottom-0 pb-0 mt-3 mx-3">
                <h4 className="modal-title fw-bold text-dark">Yeni Menü Ürünü</h4>
                <button type="button" className="btn-close shadow-none" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body p-4 pt-2">
                <p className="text-muted small mb-4">Müşterilerinize sunacağınız yeni lezzetin detaylarını girin.</p>
                <AddMenuItem onAdd={handleAddItem} />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;