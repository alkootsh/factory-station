"""
المساعد الذكي التفاعلي لمنظومة عين الصقر - Interactive AI Copilot View
CustomTkinter Chatbot & Explainer
شرح كل جزئية في البرنامج للمستخدم، الإجابة عن استفسارات الـ PLC والمحاسبة والفرز والصيانة
"""

import customtkinter as ctk
import datetime
from tkinter import messagebox


class AIAssistantView(ctk.CTkFrame):
    """نافذة المساعد الذكي التفاعلي وبوت الدعم الفني"""

    def __init__(self, master, db):
        super().__init__(master, fg_color="transparent")
        self.db = db

        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(1, weight=1)

        self.messages_history = []
        self.setup_ui()
        self.add_bot_message(
            "🦅 أهلاً بك يا باشمهندس في المساعد الذكي لمنظومة عين الصقر (Falcon Eye AI Copilot)!\n\n"
            "أنا هنا لمساعدتك في كل ما يخص إدارة وتشغيل الخط:\n"
            "• 🔍 شرح كل شاشة وزر وموديول بالبرنامج.\n"
            "• 🔮 التنبؤ بالأعطال وخطوات الصيانة خطوة بخطوة.\n"
            "• 🍇 إعداد خطوط العنب والخضار والموالح والبطاطس والتمور.\n"
            "• 🧾 حسابات ضريبة القيمة المضافة 14% والخصم التلقائي للمخزون.\n"
            "• 🔌 ربط كروت PLC وموازين RS232 وكاميرات الفرز.\n\n"
            "اختر من الأسئلة السريعة أدناه أو اكتب سؤالك في الأسفل!"
        )

    def setup_ui(self):
        # 1. شريط العنوان العلوي
        header = ctk.CTkFrame(self, fg_color="#0f172a", corner_radius=12, border_width=1, border_color="#334155")
        header.grid(row=0, column=0, sticky="ew", padx=10, pady=(0, 10))

        title_lbl = ctk.CTkLabel(
            header,
            text="🤖 المساعد الذكي التفاعلي وبوت تشغيل وشرح المنظومة (AI Copilot)",
            font=ctk.CTkFont(family="Cairo", size=18, weight="bold"),
            text_color="#10b981"
        )
        title_lbl.pack(side="right", padx=15, pady=12)

        badge = ctk.CTkLabel(
            header,
            text="🟢 متصل بالذكاء الاصطناعي الصناعي (Online)",
            font=ctk.CTkFont(family="Cairo", size=11, weight="bold"),
            text_color="#38bdf8",
            fg_color="#0369a1",
            corner_radius=6,
            padx=10,
            pady=4
        )
        badge.pack(side="left", padx=15)

        # 2. منطقة المحادثة التفاعلية
        chat_card = ctk.CTkFrame(self, fg_color="#1e293b", corner_radius=12, border_width=1, border_color="#334155")
        chat_card.grid(row=1, column=0, sticky="nsew", padx=10, pady=(0, 10))
        chat_card.grid_columnconfigure(0, weight=1)
        chat_card.grid_rowconfigure(0, weight=1)

        # صندوق الرسائل القابل للتمرير
        self.chat_textbox = ctk.CTkTextbox(
            chat_card,
            font=ctk.CTkFont(family="Cairo", size=13),
            fg_color="#0f172a",
            text_color="#f8fafc",
            wrap="word",
            corner_radius=10,
            border_width=1,
            border_color="#334155"
        )
        self.chat_textbox.grid(row=0, column=0, sticky="nsew", padx=12, pady=12)
        self.chat_textbox.configure(state="disabled")

        # 3. شريط الاقتراحات السريعة
        chips_frame = ctk.CTkFrame(self, fg_color="transparent")
        chips_frame.grid(row=2, column=0, sticky="ew", padx=10, pady=(0, 8))

        quick_prompts = [
            ("شرح شاشات البرنامج", self.ask_explain_modules),
            ("كيف يتنبأ الذكاء بالأعطال؟", self.ask_predictive_faults),
            ("إعداد خط العنب والخضار", self.ask_grapes_vegetables),
            ("معادلة الضريبة 14% والمخزون", self.ask_vat_accounting),
            ("ربط كارت PLC وميزان RS232", self.ask_plc_scales),
        ]

        for text, cmd in reversed(quick_prompts):
            btn = ctk.CTkButton(
                chips_frame,
                text=text,
                font=ctk.CTkFont(family="Cairo", size=11),
                fg_color="#334155",
                hover_color="#475569",
                height=28,
                corner_radius=6,
                command=cmd
            )
            btn.pack(side="right", padx=3)

        # 4. شريط الإدخال والإرسال
        input_frame = ctk.CTkFrame(self, fg_color="transparent")
        input_frame.grid(row=3, column=0, sticky="ew", padx=10, pady=(0, 10))
        input_frame.grid_columnconfigure(0, weight=1)

        self.input_entry = ctk.CTkEntry(
            input_frame,
            font=ctk.CTkFont(family="Cairo", size=13),
            placeholder_text="اكتب استفسارك هنا (مثال: اشرح لي خطوات صيانة قاذف الهواء، أو معادلة ضريبة القيمة المضافة)...",
            height=42,
            border_color="#475569"
        )
        self.input_entry.grid(row=0, column=0, sticky="ew", padx=(0, 8))
        self.input_entry.bind("<Return>", lambda e: self.send_message())

        send_btn = ctk.CTkButton(
            input_frame,
            text="إرسال ↵",
            font=ctk.CTkFont(family="Cairo", size=13, weight="bold"),
            fg_color="#10b981",
            hover_color="#059669",
            width=100,
            height=42,
            command=self.send_message
        )
        send_btn.grid(row=0, column=1)

    def add_bot_message(self, text: str):
        self.chat_textbox.configure(state="normal")
        time_str = datetime.datetime.now().strftime("%H:%M")
        self.chat_textbox.insert("end", f"\n[🦅 المساعد الذكي - {time_str}]:\n{text}\n" + "—" * 60 + "\n")
        self.chat_textbox.see("end")
        self.chat_textbox.configure(state="disabled")

    def add_user_message(self, text: str):
        self.chat_textbox.configure(state="normal")
        time_str = datetime.datetime.now().strftime("%H:%M")
        self.chat_textbox.insert("end", f"\n[👤 أنت - {time_str}]: {text}\n")
        self.chat_textbox.see("end")
        self.chat_textbox.configure(state="disabled")

    def send_message(self):
        query = self.input_entry.get().strip()
        if not query:
            return

        self.input_entry.delete(0, "end")
        self.add_user_message(query)
        self.generate_response(query)

    def generate_response(self, query: str):
        q = query.lower()
        if "شرح" in q or "شاشة" in q or "برنامج" in q:
            self.ask_explain_modules()
        elif "عطل" in q or "اعطال" in q or "تنبؤ" in q:
            self.ask_predictive_faults()
        elif "عنب" in q or "خضار" in q:
            self.ask_grapes_vegetables()
        elif "ضريبة" in q or "فاتورة" in q or "مخزون" in q or "vat" in q:
            self.ask_vat_accounting()
        elif "plc" in q or "ميزان" in q or "طابعة" in q:
            self.ask_plc_scales()
        else:
            self.add_bot_message(
                f"تحت أمرك يا باشمهندس بخصوص: «{query}».\n\n"
                "منظومة عين الصقر توفر تحكماً مركزياً شاملاً:\n"
                "• يمكنك تهيئة وتعديل إعدادات أي خط من نافذة 'إدارة وتكوين الخطوط'.\n"
                "• تتبع ومسح الأعطال والتنبؤ التلقائي من نافذة 'محرك التنبيهات والأعطال'.\n"
                "• وإصدار الفواتير وضريبة 14% وخصم المخزون من نافذة 'نقطة البيع والفواتير'.\n"
                "حدد الموضوع الذي ترغب في شرحه وسأزودك بالتفاصيل فوراً!"
            )

    def ask_explain_modules(self):
        self.add_bot_message(
            "📋 دليل وشرح شاشات وأقسام منظومة عين الصقر (Falcon Eye OS):\n\n"
            "1. 📊 لوحة المؤشرات (Dashboard): إجمالي المبيعات، المخزون، المشتريات، ومعدل إنتاجية الخط بالطن/ساعة.\n"
            "2. 🎛️ تشغيل الخطوط (Line Control): مفاتيح تشغيل العاكسات، ضبط السرعات، وقواذف الفرز.\n"
            "3. 🏭 إدارة الخطوط (Lines Config): إضافة وتخصيص أي خط (عنب، خضار، موالح، بطاطس، تمور).\n"
            "4. ⚠️ محرك التنبيهات والأعطال: التنبؤ بالخلل قبل توقف الخط بـ 12-72 ساعة.\n"
            "5. 🔌 الربط الصناعي PLC: قراءة سجلات Modbus TCP والتحكم في صمامات الهواء.\n"
            "6. ⚖️ الموازين والطابعات: ربط موازين الباركود وطابعات Zebra وملصقات GS1-128.\n"
            "7. 📦 المخزون والفواتير: فواتير بيع مع احتساب 14% ضريبة ق.م وخصم تلقائي للرصيد."
        )

    def ask_predictive_faults(self):
        self.add_bot_message(
            "🔮 كيف يتنبأ الذكاء الاصطناعي بالأعطال قبل حدوثها؟\n\n"
            "يرصد النظام 6 مؤشرات تيليمتري حيوية:\n"
            "1. محامل المحركات (Bearings): رصد طيف الاهتزاز فوق 1.2 kHz لتوقع قفش البلي قبل 72 ساعة.\n"
            "2. صمامات الهواء (Solenoids): رصد زيادة زمن استجابة القاذف فوق 18ms للتنبؤ بالتسريب.\n"
            "3. خلايا الوزن: رصد انحراف نقطة الصفر الديناميكي (Zero-Drift) وتنبيه الفني للمعايرة.\n"
            "4. لمبات الـ NIR: قياس هبوط اللومن بنسبة 15% لتغيير لمبة الهالوجين قبل الاحتراق.\n"
            "طريقة الإصلاح: يعرض النظام لكل عطل: السبب الجذري، وقت التوقف المتوقع، قطع الغيار، ودليل الإصلاح خطوة بخطوة."
        )

    def ask_grapes_vegetables(self):
        self.add_bot_message(
            "🍇 خطوط العنب والخضار في المنظومة:\n\n"
            "• خط العنب المائدي: يشمل طاولات التهذيب الضوئي LED ثلاثية المستويات، موازين البانيتات 500 جم (Checkweighers ±1g)، "
            "فحص نسبة السكر (Brix 16-20°Bx) وسلامة العنق الأخضر، وضع أوراق غاز الكبريت SO2، ونفق التبريد السريع للهواء المدفوع (Forced-Air Cooling).\n\n"
            "• خط الخضروات: يدعم الطماطم (فرز النضج بالألوان والصلابة الصوتية)، الفلفل الملون، الخيار والكوسة (فحص الانحناء والاستقامة 3D)، "
            "والتغليف الانكماشي الحراري Flowpack."
        )

    def ask_vat_accounting(self):
        self.add_bot_message(
            "🧾 معادلات المحاسبة والضريبة 14% وإدارة المخزون:\n\n"
            "• الوعاء الخاضع للضريبة = (الكمية × السعر) - قيمة الخصم\n"
            "• ضريبة القيمة المضافة = الوعاء الخاضع × 0.14\n"
            "• إجمالي الفاتورة = الوعاء الخاضع + ضريبة القيمة المضافة (14%)\n\n"
            "• الخصم التلقائي للمخزون: فور إصدار الفاتورة ينفذ استعلام ذري (Atomic SQL) يخصم الكمية من جدول products، "
            "ويسجل حركة في inventory_movements برقم الفاتورة واسم العميل."
        )

    def ask_plc_scales(self):
        self.add_bot_message(
            "🔌 ربط وحدات PLC والموازين:\n\n"
            "• PLC Modbus TCP: الاتصال عبر 192.168.1.50:502. السجل 40001 لسرعة السير، والـ Coils 00001-00016 للقواذف الهوائية.\n"
            "• موازين RS232: منفذ COM 9600 8N1 لقراءة الوزن الصافي بالجرام آلياً.\n"
            "• طابعات الباركود Zebra: إرسال كود ZPL عبر المنفذ 9100 لطباعة استيكر الكرتونة والباليتة فوراً."
        )
