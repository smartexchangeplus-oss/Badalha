# بدّلها — دليل التشغيل والنشر

مشروع حقيقي جاهز: تسجيل دخول فعلي، قاعدة بيانات دائمة، رسائل لحظية بين المستخدمين.

## الخطوة 1: إنشاء مشروع Supabase (قاعدة البيانات + المصادقة)
1. روح لـ https://supabase.com وسجّل حساب مجاني (بحساب GitHub أسهل)
2. اضغط **New Project** واختر اسم واختر كلمة مرور لقاعدة البيانات (احفظها بمكان آمن)
3. بعد ما يجهز المشروع (يأخذ دقيقة)، روح لـ **SQL Editor** من القائمة الجانبية
4. افتح ملف `schema.sql` الموجود بهذا المجلد، انسخ محتواه كامل، الصقه، واضغط **Run**
5. روح لـ **Settings → API** وانسخ:
   - **Project URL**
   - **anon public key**

## الخطوة 2: ربط المشروع بالمفاتيح
1. انسخ ملف `.env.example` وسمّه `.env`
2. الصق فيه القيم اللي نسختها من Supabase:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

## الخطوة 3: التشغيل المحلي (للتجربة قبل النشر)
```bash
npm install
npm run dev
```
افتح الرابط اللي يظهر (عادة `http://localhost:5173`) وجرّب تسوي حساب وتضيف منتج.

> ملاحظة: افتراضيًا Supabase يطلب تأكيد البريد الإلكتروني عند التسجيل. للتجربة السريعة بدون تعقيد،
> روح لـ **Authentication → Providers → Email** في Supabase وأطفئ خيار "Confirm email" مؤقتًا،
> وفعّله مرة ثانية قبل ما تنشر الموقع للعامة.

## الخطوة 4: الرفع على GitHub
1. أنشئ مستودع جديد (زي ما سوّيت قبل)
2. من داخل مجلد المشروع:
   ```bash
   git init
   git add .
   git commit -m "أول نسخة من بدّلها"
   git branch -M main
   git remote add origin https://github.com/USERNAME/badalha.git
   git push -u origin main
   ```
   (لاحظ: ملف `.env` ما يترفع على GitHub تلقائيًا — هذا مقصود ومهم لحماية مفاتيحك)

## الخطوة 5: النشر على Vercel
1. سجّل دخول على https://vercel.com بحساب GitHub
2. اضغط **Add New → Project** واختر مستودع `badalha`
3. قبل ما تضغط Deploy، افتح **Environment Variables** وضيف:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   (نفس القيم اللي بملف `.env` عندك)
4. اضغط **Deploy** — بعد دقيقة أو دقيقتين موقعك حي على رابط مثل `badalha.vercel.app`

## بعدين: ربط النطاق الخاص
من إعدادات المشروع بـ Vercel → **Domains** → أضف `badalha.com` واتبع تعليمات ربط DNS
اللي يعطيك ياها Vercel (تنسخها لإعدادات النطاق عند GoDaddy أو أي مزود تشتري منه).

---

## أمان مهم قبل الإطلاق الفعلي
- تأكد "Confirm email" مفعّل بـ Supabase قبل ما توصل رابط الموقع لأي حد
- راجع سياسات RLS بملف `schema.sql` — هذي هي اللي تمنع أي مستخدم من حذف أو تعديل بيانات غيره
- لا تشارك مفتاح `service_role` من Supabase مع أي أحد أو تحطه بالكود — استخدم فقط `anon public key`
