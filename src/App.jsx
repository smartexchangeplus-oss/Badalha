import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Repeat, Search, MapPin, MessageCircle, Plus, LogOut, Send, Tag,
  Package, Trash2, ArrowRight, Shirt, BookOpen, Gamepad2, Sofa, Image as ImageIcon, X as XIcon,
  Smartphone, Dumbbell, Wrench, LayoutGrid, UserRound, Home, Languages,
} from "lucide-react";
import { supabase } from "./supabaseClient";

const CATEGORIES = ["إلكترونيات", "أثاث", "ملابس", "كتب", "ألعاب أطفال", "أدوات منزلية", "رياضة", "أخرى"];

const CATEGORY_ICONS = {
  "إلكترونيات": Smartphone,
  "أثاث": Sofa,
  "ملابس": Shirt,
  "كتب": BookOpen,
  "ألعاب أطفال": Gamepad2,
  "أدوات منزلية": Wrench,
  "رياضة": Dumbbell,
  "أخرى": LayoutGrid,
};

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Lalezar&family=Tajawal:wght@300;400;500;700;800&display=swap');
  * { font-family: 'Tajawal', sans-serif; }
  .font-display { font-family: 'Lalezar', 'Tajawal', sans-serif; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: #c9c2ac; border-radius: 4px; }
  @keyframes riseIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .rise { animation: riseIn .35s ease both; }
  @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes spinSlowReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
  .float-a { animation: floatY 3.2s ease-in-out infinite; }
  .float-b { animation: floatY 3.6s ease-in-out infinite .4s; }
  .float-c { animation: floatY 3s ease-in-out infinite .8s; }
  .float-d { animation: floatY 3.8s ease-in-out infinite 1.2s; }
  .spin-slow { animation: spinSlow 14s linear infinite; }
  .spin-slow-rev { animation: spinSlowReverse 14s linear infinite; }
  @media (prefers-reduced-motion: reduce) {
    .float-a, .float-b, .float-c, .float-d, .spin-slow, .spin-slow-rev { animation: none; }
  }
  .input {
    width: 100%; padding: 0.5rem 0.75rem; border-radius: 0.5rem;
    border: 1px solid #ddd6c2; background: #FAF8F1; outline: none; font-size: 0.9rem;
  }
`;

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "الآن";
  if (diff < 3600) return `منذ ${Math.floor(diff / 60)} د`;
  if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} س`;
  return `منذ ${Math.floor(diff / 86400)} يوم`;
}

// ============ الغلاف المصمم ============
function IconBubble({ color, children }) {
  return (
    <div className="rounded-full flex items-center justify-center shadow-sm" style={{ width: 30, height: 30, background: color }}>
      {children}
    </div>
  );
}
function <div className="mt-4 rounded-2xl overflow-hidden">
  <img src="/market-hero.png" alt="بدّلها" className="w-full object-cover" style={{ maxHeight: 160 }} />
</div>
  const size = compact ? 92 : 148;
  return (
    <div className="relative flex items-center justify-center mx-auto" style={{ width: "100%", maxWidth: compact ? 420 : 340, height: compact ? 110 : 220 }}>
      <div className="absolute rounded-full spin-slow" style={{ width: size * 2.05, height: size * 2.05, border: "2px dashed #c7bd9c", opacity: 0.6 }} />
      <div className="absolute rounded-full spin-slow-rev" style={{ width: size * 1.55, height: size * 1.55, border: "2px dashed #1E4B43", opacity: 0.25 }} />
      <div className="absolute float-a" style={{ top: "6%", right: "8%" }}><IconBubble color="#1E4B43"><Shirt size={compact ? 15 : 20} color="#fff" /></IconBubble></div>
      <div className="absolute float-b" style={{ bottom: "10%", right: "2%" }}><IconBubble color="#D9A441"><BookOpen size={compact ? 15 : 20} color="#fff" /></IconBubble></div>
      <div className="absolute float-c" style={{ top: "8%", left: "4%" }}><IconBubble color="#D9A441"><Gamepad2 size={compact ? 15 : 20} color="#fff" /></IconBubble></div>
      <div className="absolute float-d" style={{ bottom: "6%", left: "10%" }}><IconBubble color="#1E4B43"><Sofa size={compact ? 15 : 20} color="#fff" /></IconBubble></div>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="absolute rounded-2xl shadow-md flex items-center justify-center" style={{ width: size * 0.62, height: size * 0.62, background: "#1E4B43", right: size * 0.16, top: size * 0.08 }}>
          <Package size={size * 0.28} color="#EDEAE0" />
        </div>
        <div className="absolute rounded-2xl shadow-md flex items-center justify-center" style={{ width: size * 0.62, height: size * 0.62, background: "#D9A441", left: size * 0.16, bottom: size * 0.08 }}>
          <Package size={size * 0.28} color="#1E4B43" />
        </div>
        <div className="absolute rounded-full flex items-center justify-center shadow" style={{ width: size * 0.4, height: size * 0.4, background: "#FAF6EF", border: "2px solid #1E4B43" }}>
          <Repeat size={size * 0.2} color="#1E4B43" />
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold mb-1" style={{ color: "#5b5647" }}>{label}</label>
      {children}
    </div>
  );
}
function BackBar({ title, onBack }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <button onClick={onBack} className="p-1.5 rounded-full hover:bg-black/5"><ArrowRight size={18} color="#24211A" /></button>
      <h2 className="font-bold text-lg truncate" style={{ color: "#24211A" }}>{title}</h2>
    </div>
  );
}

function TicketCard({ product, myId, onContact, onDelete }) {
  const isMine = product.owner_id === myId;
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm bg-white relative" style={{ border: "1px solid #ddd6c2" }}>
      <div className="relative">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="w-full h-36 object-cover" onError={(e) => (e.target.style.display = "none")} />
        ) : (
          <div className="w-full h-36 flex items-center justify-center" style={{ background: "#1E4B43" }}>
            <Package size={34} color="#D9A441" />
          </div>
        )}
        <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#1E4B43" }}>
          <Tag size={10} className="inline ml-1" />{product.category}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm" style={{ color: "#24211A" }}>{product.title}</h3>
        <p className="text-xs mt-1 line-clamp-2" style={{ color: "#5b5647" }}>{product.description}</p>
        <div className="flex items-center gap-1 text-xs mt-2" style={{ color: "#8a836c" }}>
          <MapPin size={12} /> {product.location} · {product.owner?.name || "مستخدم"}
        </div>
      </div>
      <div className="relative flex items-center px-3">
        <div className="absolute right-0 w-3 h-3 rounded-full" style={{ background: "#EDEAE0", transform: "translateX(50%)" }} />
        <div className="flex-1 border-t border-dashed" style={{ borderColor: "#ddd6c2" }} />
        <div className="absolute left-0 w-3 h-3 rounded-full" style={{ background: "#EDEAE0", transform: "translateX(-50%)" }} />
      </div>
      <div className="p-3 flex items-center justify-between" style={{ background: "#FBF3DE" }}>
        <div>
          <p className="text-[10px] font-bold" style={{ color: "#a8791f" }}>المطلوب مقابله</p>
          <p className="text-xs font-medium" style={{ color: "#24211A" }}>{product.want_in_exchange || "مفتوح للعروض"}</p>
        </div>
        {isMine ? (
          <button onClick={() => onDelete(product.id)} className="p-2 rounded-full text-white" style={{ background: "#B4483A" }}><Trash2 size={15} /></button>
        ) : (
          <button onClick={() => onContact(product)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-bold" style={{ background: "#1E4B43" }}>
            <Repeat size={13} /> تبادل
          </button>
        )}
      </div>
    </div>
  );
}

// ============ التطبيق الرئيسي ============
export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authMode, setAuthMode] = useState("signin"); // signin | signup
  const [authForm, setAuthForm] = useState({ email: "", password: "", name: "", city: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState("feed");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [locFilter, setLocFilter] = useState("");
  const [activeConvId, setActiveConvId] = useState(null);
  const [chatText, setChatText] = useState("");
  const [chatImage, setChatImage] = useState(null); // ملف الصورة المختارة
  const [chatImagePreview, setChatImagePreview] = useState(""); // رابط معاينة محلي
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ title: "", desc: "", category: CATEGORIES[0], location: "", imageUrl: "", want: "" });
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState("");
  const [uploadingProductImage, setUploadingProductImage] = useState(false);
  const productFileInputRef = useRef(null);

  function handlePickProductImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("اختر ملف صورة فقط");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("حجم الصورة أكبر من 5 ميجا");
      return;
    }
    setProductImage(file);
    setProductImagePreview(URL.createObjectURL(file));
  }

  function handleClearProductImage() {
    setProductImage(null);
    setProductImagePreview("");
    if (productFileInputRef.current) productFileInputRef.current.value = "";
  }
  const chatEndRef = useRef(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  // --- تتبع جلسة المصادقة ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  // --- تحميل الملف الشخصي بعد الدخول ---
  useEffect(() => {
    (async () => {
      if (!session) {
        setProfile(null);
        setReady(true);
        return;
      }
      const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      setProfile(data);
      setReady(true);
    })();
  }, [session]);

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase
      .from("products")
      .select("*, owner:profiles(name, city)")
      .order("created_at", { ascending: false });
    setProducts(data || []);
  }, []);

  const fetchConversations = useCallback(async () => {
    if (!profile) return;
    const { data } = await supabase
      .from("conversations")
      .select("*, a:profiles!conversations_user_a_fkey(name), b:profiles!conversations_user_b_fkey(name)")
      .or(`user_a.eq.${profile.id},user_b.eq.${profile.id}`)
      .order("updated_at", { ascending: false });
    setConversations(data || []);
  }, [profile]);

  useEffect(() => {
    if (!profile) return;
    fetchProducts();
    fetchConversations();

    // تحديث لحظي: منتج جديد يظهر مباشرة للجميع
    const productsChannel = supabase
      .channel("products-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, fetchProducts)
      .subscribe();

    return () => supabase.removeChannel(productsChannel);
  }, [profile, fetchProducts, fetchConversations]);

  // --- رسائل المحادثة النشطة + الاستماع اللحظي ---
  useEffect(() => {
    if (!activeConvId) return;
    let channel;
    (async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", activeConvId)
        .order("created_at", { ascending: true });
      setMessages(data || []);

      channel = supabase
        .channel(`messages-${activeConvId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${activeConvId}` },
          (payload) => setMessages((prev) => [...prev, payload.new])
        )
        .subscribe();
    })();
    return () => channel && supabase.removeChannel(channel);
  }, [activeConvId]);

  useEffect(() => {
    if (view === "chat") chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, view]);

  // --- المصادقة ---
  async function handleAuthSubmit(e) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      if (authMode === "signup") {
        if (!authForm.name.trim() || !authForm.city.trim()) {
          setAuthError("اكتب اسمك ومدينتك");
          setAuthLoading(false);
          return;
        }
        const { data, error } = await supabase.auth.signUp({ email: authForm.email, password: authForm.password });
        if (error) throw error;
        if (data.user) {
          await supabase.from("profiles").insert({ id: data.user.id, name: authForm.name.trim(), city: authForm.city.trim() });
        }
        showToast("تم إنشاء الحساب! تحقق من بريدك إذا طُلب تأكيد");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: authForm.email, password: authForm.password });
        if (error) throw error;
      }
    } catch (err) {
      setAuthError(err.message === "Invalid login credentials" ? "بيانات الدخول غير صحيحة" : err.message);
    }
    setAuthLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setView("feed");
  }

  // --- المنتجات ---
  async function handleAddProduct(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.desc.trim()) return;

    let imageUrl = form.imageUrl.trim() || null;
    if (productImage) {
      setUploadingProductImage(true);
      const ext = productImage.name.split(".").pop();
      const path = `${profile.id}/${uid()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("product-images").upload(path, productImage);
      if (uploadError) {
        showToast("تعذر رفع الصورة: " + uploadError.message);
        setUploadingProductImage(false);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(path);
      imageUrl = publicUrlData.publicUrl;
      setUploadingProductImage(false);
    }

    const { error } = await supabase.from("products").insert({
      owner_id: profile.id,
      title: form.title.trim(),
      description: form.desc.trim(),
      category: form.category,
      location: form.location.trim() || profile.city,
      image_url: imageUrl,
      want_in_exchange: form.want.trim() || "مفتوح للعروض",
    });
    if (error) { showToast("صار خطأ: " + error.message); return; }
    setForm({ title: "", desc: "", category: CATEGORIES[0], location: "", imageUrl: "", want: "" });
    handleClearProductImage();
    setView("feed");
    showToast("تمت إضافة المنتج للسوق");
  }

  async function handleDeleteProduct(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) showToast("تم حذف المنتج");
  }

  // --- المحادثات ---
  async function handleContact(product) {
    let conv = conversations.find((c) => c.product_id === product.id);
    if (!conv) {
      const { data, error } = await supabase
        .from("conversations")
        .insert({ product_id: product.id, product_title: product.title, user_a: profile.id, user_b: product.owner_id })
        .select()
        .single();
      if (error) { showToast("صار خطأ: " + error.message); return; }
      conv = data;
      await fetchConversations();
    }
    setActiveConvId(conv.id);
    setView("chat");
  }

  function handlePickImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("اختر ملف صورة فقط");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("حجم الصورة أكبر من 5 ميجا");
      return;
    }
    setChatImage(file);
    setChatImagePreview(URL.createObjectURL(file));
  }

  function handleClearImage() {
    setChatImage(null);
    setChatImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSend() {
    if ((!chatText.trim() && !chatImage) || !activeConvId) return;
    const text = chatText.trim();
    let imageUrl = null;

    if (chatImage) {
      setUploadingImage(true);
      const ext = chatImage.name.split(".").pop();
      const path = `${activeConvId}/${uid()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("chat-images").upload(path, chatImage);
      if (uploadError) {
        showToast("تعذر رفع الصورة: " + uploadError.message);
        setUploadingImage(false);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from("chat-images").getPublicUrl(path);
      imageUrl = publicUrlData.publicUrl;
      setUploadingImage(false);
    }

    setChatText("");
    handleClearImage();
    await supabase.from("messages").insert({
      conversation_id: activeConvId,
      sender_id: profile.id,
      text: text || null,
      image_url: imageUrl,
    });
    await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", activeConvId);
  }

  const filtered = products.filter((p) => {
    const q = search.trim().toLowerCase();
    const matchesQ = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchesCat = !catFilter || p.category === catFilter;
    const matchesLoc = !locFilter.trim() || p.location.toLowerCase().includes(locFilter.trim().toLowerCase());
    return matchesQ && matchesCat && matchesLoc;
  });

  const activeConv = conversations.find((c) => c.id === activeConvId);

  if (!ready) {
    return (
      <div dir="rtl" style={{ background: "#EDEAE0", minHeight: "100vh" }} className="flex items-center justify-center">
        <style>{FONT_STYLE}</style>
        <div className="font-display text-3xl" style={{ color: "#1E4B43" }}>بدّلها⇄</div>
      </div>
    );
  }

  // ---------- شاشة المصادقة الحقيقية ----------
  if (!session || !profile) {
    return (
      <div dir="rtl" style={{ background: "#EDEAE0", minHeight: "100vh" }} className="flex items-center justify-center p-6">
        <style>{FONT_STYLE}</style>
        <div className="rise w-full max-w-sm">
          <HeroCover />
          <div className="text-center mb-6">
            <div className="font-display text-5xl mb-2" style={{ color: "#1E4B43" }}>
              بدّلها <span style={{ color: "#D9A441" }}>⇄</span>
            </div>
            <p className="text-sm" style={{ color: "#5b5647" }}>سوق مجاني لتبادل الأغراض المستعملة</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: "1px solid #ddd6c2" }}>
            <div className="flex mb-4 rounded-lg overflow-hidden" style={{ border: "1px solid #ddd6c2" }}>
              <button
                onClick={() => setAuthMode("signin")}
                className="flex-1 py-2 text-sm font-bold"
                style={{ background: authMode === "signin" ? "#1E4B43" : "#fff", color: authMode === "signin" ? "#fff" : "#24211A" }}
              >
                تسجيل الدخول
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className="flex-1 py-2 text-sm font-bold"
                style={{ background: authMode === "signup" ? "#1E4B43" : "#fff", color: authMode === "signup" ? "#fff" : "#24211A" }}
              >
                حساب جديد
              </button>
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {authMode === "signup" && (
                <>
                  <Field label="اسمك">
                    <input required value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} className="input" />
                  </Field>
                  <Field label="مدينتك">
                    <input required value={authForm.city} onChange={(e) => setAuthForm({ ...authForm, city: e.target.value })} className="input" />
                  </Field>
                </>
              )}
              <Field label="البريد الإلكتروني">
                <input required type="email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} className="input" />
              </Field>
              <Field label="كلمة المرور">
                <input required type="password" minLength={6} value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} className="input" />
              </Field>
              {authError && <p className="text-xs" style={{ color: "#B4483A" }}>{authError}</p>}
              <button disabled={authLoading} type="submit" className="w-full py-2.5 rounded-lg font-bold text-white disabled:opacity-50" style={{ background: "#1E4B43" }}>
                {authLoading ? "..." : authMode === "signup" ? "إنشاء الحساب" : "دخول"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ---------- التطبيق بعد الدخول ----------
  return (
    <div dir="rtl" style={{ background: "#EDEAE0", minHeight: "100vh" }} className="pb-24">
      <style>{FONT_STYLE}</style>

      <div className="sticky top-0 z-20" style={{ background: "#1E4B43" }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-center">
          <button onClick={() => setView("feed")} className="font-display text-2xl text-white flex items-center gap-1">
            بدّلها <span style={{ color: "#D9A441" }}>⇄</span>
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full text-white text-sm shadow-lg rise" style={{ background: "#24211A" }}>
          {toast}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4">
        {view === "feed" && (
          <div className="rise">
<HeroCover compact />
            {/* شريط بحث بارز على طراز أولكس */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 shadow-sm" style={{ border: "1px solid #ddd6c2" }}>
                <Search size={18} color="#8a836c" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن غرض تحتاجه..." className="flex-1 outline-none bg-transparent text-sm" />
              </div>
              <div className="flex items-center gap-1 bg-white rounded-xl px-2.5 py-2.5 shadow-sm shrink-0" style={{ border: "1px solid #ddd6c2" }}>
                <MapPin size={16} color="#8a836c" />
                <input value={locFilter} onChange={(e) => setLocFilter(e.target.value)} placeholder="المدينة" className="outline-none bg-transparent w-16 text-sm" />
              </div>
            </div>

            {/* شبكة الفئات بمربعات على طراز أولكس */}
            <h2 className="font-bold text-lg mt-5 mb-3" style={{ color: "#24211A" }}>استكشف سوق بدّلها</h2>
            <div className="grid grid-cols-4 gap-3">
              {CATEGORIES.map((c) => {
                const CatIcon = CATEGORY_ICONS[c];
                const active = catFilter === c;
                return (
                  <button key={c} onClick={() => setCatFilter(active ? "" : c)} className="flex flex-col items-center gap-1.5">
                    <span
                      className="w-full aspect-square rounded-2xl flex items-center justify-center transition"
                      style={{ background: active ? "#1E4B43" : "#FBF3DE", border: active ? "none" : "1px solid #ecdfb8" }}
                    >
                      <CatIcon size={24} color={active ? "#fff" : "#a8791f"} />
                    </span>
                    <span className="text-[11px] leading-tight" style={{ color: active ? "#1E4B43" : "#5b5647", fontWeight: active ? 700 : 500 }}>
                      {c}
                    </span>
                  </button>
                );
              })}
            </div>
            {catFilter && (
              <button onClick={() => setCatFilter("")} className="mt-3 text-xs font-bold flex items-center gap-1" style={{ color: "#B4483A" }}>
                <XIcon size={12} /> إلغاء تصفية "{catFilter}"
              </button>
            )}

            <HeroCover compact />

            {/* عنوان قسم الإعلانات + زر الإضافة */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-base" style={{ color: "#24211A" }}>
                {catFilter ? `أغراض بفئة ${catFilter}` : "أحدث الإعلانات"}
                <span className="font-normal text-sm mr-1" style={{ color: "#8a836c" }}>({filtered.length})</span>
              </h2>
              <button onClick={() => setView("add")} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-white text-sm font-bold shrink-0" style={{ background: "#D9A441" }}>
                <Plus size={16} /> أضف
              </button>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16" style={{ color: "#8a836c" }}>
                <Package size={36} className="mx-auto mb-2" />
                <p>لا توجد أغراض مطابقة الآن.</p>
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((p) => <TicketCard key={p.id} product={p} myId={profile.id} onContact={handleContact} onDelete={handleDeleteProduct} />)}
            </div>
          </div>
        )}

        {view === "mine" && (
          <div className="rise mt-4">
            <BackBar title="إعلاناتي" onBack={() => setView("feed")} />
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              {products.filter((p) => p.owner_id === profile.id).length === 0 && (
                <p className="col-span-2 text-center py-10" style={{ color: "#8a836c" }}>لم تضف أي غرض بعد.</p>
              )}
              {products.filter((p) => p.owner_id === profile.id).map((p) => (
                <TicketCard key={p.id} product={p} myId={profile.id} onContact={handleContact} onDelete={handleDeleteProduct} />
              ))}
            </div>
          </div>
        )}

        {view === "add" && (
          <div className="rise mt-4">
            <BackBar title="إضافة غرض للتبادل" onBack={() => setView("feed")} />
            <form onSubmit={handleAddProduct} className="bg-white rounded-2xl p-5 mt-3 space-y-3" style={{ border: "1px solid #ddd6c2" }}>
              <Field label="اسم الغرض"><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" /></Field>
              <Field label="الوصف"><textarea required rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="input resize-none" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="الفئة">
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="المدينة"><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder={profile.city} className="input" /></Field>
              </div>
              <Field label="صورة الغرض">
                <input ref={productFileInputRef} type="file" accept="image/*" onChange={handlePickProductImage} className="hidden" />
                {productImagePreview ? (
                  <div className="relative inline-block">
                    <img src={productImagePreview} alt="معاينة" className="w-28 h-28 object-cover rounded-xl" style={{ border: "1px solid #ddd6c2" }} />
                    <button type="button" onClick={handleClearProductImage} className="absolute -top-2 -left-2 rounded-full p-1" style={{ background: "#B4483A" }}>
                      <XIcon size={12} color="#fff" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => productFileInputRef.current?.click()} className="w-28 h-28 rounded-xl flex flex-col items-center justify-center gap-1" style={{ background: "#FAF8F1", border: "1px dashed #ddd6c2" }}>
                    <ImageIcon size={20} color="#8a836c" />
                    <span className="text-[10px]" style={{ color: "#8a836c" }}>ارفع صورة</span>
                  </button>
                )}
              </Field>
              <Field label="المطلوب مقابله"><input value={form.want} onChange={(e) => setForm({ ...form, want: e.target.value })} placeholder="مثال: أي كتاب رواية" className="input" /></Field>
              <button type="submit" disabled={uploadingProductImage} className="w-full py-2.5 rounded-lg font-bold text-white disabled:opacity-50" style={{ background: "#1E4B43" }}>
                {uploadingProductImage ? "جارٍ رفع الصورة..." : "نشر الغرض"}
              </button>
            </form>
          </div>
        )}

        {view === "messages" && (
          <div className="rise mt-4">
            <BackBar title="الرسائل" onBack={() => setView("feed")} />
            {conversations.length === 0 && <p className="text-center py-16" style={{ color: "#8a836c" }}>لا توجد محادثات بعد.</p>}
            <div className="space-y-2 mt-3">
              {conversations.map((c) => {
                const otherName = c.user_a === profile.id ? c.b?.name : c.a?.name;
                return (
                  <button key={c.id} onClick={() => { setActiveConvId(c.id); setView("chat"); }} className="w-full text-right bg-white rounded-xl p-3 hover:bg-[#FAF8F1]" style={{ border: "1px solid #ddd6c2" }}>
                    <p className="font-bold text-sm" style={{ color: "#24211A" }}>{otherName} <span className="font-normal" style={{ color: "#8a836c" }}>· {c.product_title}</span></p>
                    <p className="text-xs mt-0.5" style={{ color: "#8a836c" }}>{timeAgo(c.updated_at)}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {view === "chat" && activeConv && (
          <div className="rise mt-4 flex flex-col" style={{ height: "75vh" }}>
            <BackBar title={(activeConv.user_a === profile.id ? activeConv.b?.name : activeConv.a?.name) + " — " + activeConv.product_title} onBack={() => setView("messages")} />
            <div className="flex-1 overflow-y-auto bg-white rounded-xl p-3 mt-3 space-y-2" style={{ border: "1px solid #ddd6c2" }}>
              {messages.length === 0 && <p className="text-center text-sm py-8" style={{ color: "#8a836c" }}>ابدأ التفاوض حول التبادل الآن.</p>}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender_id === profile.id ? "justify-start" : "justify-end"}`}>
                  <div
                    className="rounded-2xl text-sm max-w-[75%] overflow-hidden"
                    style={{ background: m.sender_id === profile.id ? "#1E4B43" : "#EDEAE0", color: m.sender_id === profile.id ? "#fff" : "#24211A" }}
                  >
                    {m.image_url && (
                      <img
                        src={m.image_url}
                        alt="صورة مرسلة"
                        className="w-full max-h-56 object-cover cursor-pointer"
                        onClick={() => window.open(m.image_url, "_blank")}
                      />
                    )}
                    {m.text && <div className="px-3 py-2">{m.text}</div>}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            {chatImagePreview && (
              <div className="relative inline-block mt-2 w-20">
                <img src={chatImagePreview} alt="معاينة" className="w-20 h-20 object-cover rounded-lg" style={{ border: "1px solid #ddd6c2" }} />
                <button onClick={handleClearImage} className="absolute -top-2 -left-2 rounded-full p-1" style={{ background: "#B4483A" }}>
                  <XIcon size={12} color="#fff" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePickImage} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="p-2.5 rounded-lg shrink-0" style={{ background: "#EDEAE0", border: "1px solid #ddd6c2" }}>
                <ImageIcon size={18} color="#5b5647" />
              </button>
              <input value={chatText} onChange={(e) => setChatText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="اكتب رسالتك..." className="flex-1 input" />
              <button onClick={handleSend} disabled={uploadingImage} className="p-2.5 rounded-lg text-white disabled:opacity-50" style={{ background: "#D9A441" }}>
                <Send size={18} />
              </button>
            </div>
          </div>
        )}

        {view === "account" && (
          <div className="rise mt-4">
            <BackBar title="الحساب" onBack={() => setView("feed")} />
            <div className="bg-white rounded-2xl p-4 mt-3 flex items-center gap-3" style={{ border: "1px solid #ddd6c2" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-display text-xl text-white" style={{ background: "#1E4B43" }}>
                {profile.name?.[0] || "؟"}
              </div>
              <div>
                <p className="font-bold" style={{ color: "#24211A" }}>{profile.name}</p>
                <p className="text-xs" style={{ color: "#8a836c" }}>{profile.city}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl mt-3 overflow-hidden" style={{ border: "1px solid #ddd6c2" }}>
              <a href="mailto:support@badalha.com" className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid #f0ead8" }}>
                <ArrowLeft2 />
                <div className="text-right">
                  <p className="font-bold text-sm" style={{ color: "#24211A" }}>المساعدة والدعم</p>
                  <p className="text-xs" style={{ color: "#8a836c" }}>مركز المساعدة والشروط</p>
                </div>
              </a>
              <a href="mailto:support@badalha.com" className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid #f0ead8" }}>
                <ArrowLeft2 />
                <div className="text-right">
                  <p className="font-bold text-sm" style={{ color: "#24211A" }}>تواصل معنا</p>
                  <p className="text-xs" style={{ color: "#8a836c" }}>راسلنا لأي استفسار أو مشكلة</p>
                </div>
              </a>
              <div className="flex items-center justify-between px-4 py-3.5">
                <Languages size={18} color="#8a836c" />
                <div className="text-right">
                  <p className="font-bold text-sm" style={{ color: "#24211A" }}>العربية</p>
                  <p className="text-xs" style={{ color: "#8a836c" }}>تغيير اللغة (قريبًا)</p>
                </div>
              </div>
            </div>

            <button onClick={handleLogout} className="w-full mt-4 py-3 rounded-xl font-bold text-white" style={{ background: "#B4483A" }}>
              تسجيل الخروج
            </button>
          </div>
        )}
      </div>

      {/* شريط التنقل السفلي */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white" style={{ borderTop: "1px solid #ddd6c2" }}>
        <div className="max-w-3xl mx-auto grid grid-cols-5 items-end">
          <BottomNavItem icon={UserRound} label="الحساب" active={view === "account"} onClick={() => setView("account")} />
          <BottomNavItem icon={LayoutGrid} label="إعلاناتي" active={view === "mine"} onClick={() => setView("mine")} />
          <button onClick={() => setView("add")} className="flex flex-col items-center pb-1.5">
            <span className="w-12 h-12 rounded-full flex items-center justify-center -mt-5 shadow-lg" style={{ background: "#D9A441", border: "3px solid #fff" }}>
              <Plus size={22} color="#fff" />
            </span>
            <span className="text-[11px] mt-0.5 font-bold" style={{ color: "#5b5647" }}>أضف</span>
          </button>
          <BottomNavItem icon={MessageCircle} label="المحادثة" active={view === "messages" || view === "chat"} onClick={() => setView("messages")} />
          <BottomNavItem icon={Home} label="الرئيسية" active={view === "feed"} onClick={() => setView("feed")} />
        </div>
      </div>
    </div>
  );
}

function ArrowLeft2() {
  return <ArrowRight size={16} color="#c9c2ac" style={{ transform: "scaleX(-1)" }} />;
}

function BottomNavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-0.5 py-2.5">
      <Icon size={20} color={active ? "#1E4B43" : "#a8a293"} />
      <span className="text-[11px]" style={{ color: active ? "#1E4B43" : "#a8a293", fontWeight: active ? 700 : 500 }}>
        {label}
      </span>
    </button>
  );
}
