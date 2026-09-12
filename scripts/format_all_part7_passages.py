#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/format_all_part7_passages.py
Comprehensive cleaner and structural formatter for ALL Part 7 passages in VocabMaster.
Fixes:
- OCR noise: '000 a 0 @I', 'PTO I O*©', ', , -------, I ,'
- Formats tables in Price lists, invoices, schedules into beautiful Markdown tables
- Formats Web browser headers: 🌐 **url** | Title
- Properly segments Double/Triple Passages into === DOCUMENT 1 ===, === DOCUMENT 2 ===, etc.
"""

import json
import re

DATA_PATH = "/home/vodailoc/VocabMaster/src/data/toeic_7parts_comprehensive_bank.json"

def clean_ocr_junk(text: str) -> str:
    # 1. Clean header OCR junk like: 000 a 0 @I http://... PTO I O*©
    text = re.sub(r'000\s*[a-zA-Z0-9\(\)=\-@\s_]{0,20}\s*(?:PTO|O\*?[@©])?', '', text)
    text = re.sub(r'PTO\s*I\s*O\*?[@©]\s*', '', text)
    # 2. Clean scanner borders like: , , -------, I ,' I t I
    text = re.sub(r'[,.\s\-_\'\"]{4,}\s*(?:I\s*[\',]\s*)*I\s*t?\s*I?', ' ', text)
    text = re.sub(r'GJ\[g\]\s*\.\.', '', text)
    text = re.sub(r'[Ww/\\#_]{7,}', ' ', text)
    # 3. Clean isolated page numbers in the text (like " 52 ", " 54 ")
    text = re.sub(r'\n\s*\d{1,3}\s*\n', '\n\n', text)
    # 4. Clean broken time stamps
    text = re.sub(r'(\d{1,2})\s*:\s*(\d{2})\s*([AP]\.?M\.?)', r'\1:\2 \3', text, flags=re.I)
    # 5. Clean multi-spaces
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()

def format_q191_195(text: str) -> str:
    """Reconstruct Red Hill Tour Guides (Triple Passage: Webpage & Price List, Order Form, Customer Review)."""
    return """=== DOCUMENT 1: WEBPAGE & PRICE LIST ===

🌐 **www.redhilltourguides.com** | City Guide Books

*Red Hill Tour Guides — Home | Tour Programs | Best-Selling Books | Place Order | Reviews*

### City Guide Books
The following is a partial list of our best-selling books:

| Item | Price | Item Number |
| :--- | :--- | :--- |
| San Francisco Bay Area | $29.95 | #51601 |
| New York Skyline | $29.99 | #51603 |
| Romance in Switzerland | $28.99 | #43567 |
| Italy Highlights | $27.99 | #43568 |
| Marvelous Paris | $28.95 | #43570 |
| First Love in Tokyo | $24.99 | #43569 |
| Fantastic Madrid | $19.99 | #43572 |

=== DOCUMENT 2: ORDER FORM ===

🌐 **www.redhilltourguides.com** | Place Order

To place an order, complete the order form below or call our toll-free number at **1-800-378-8282**. Same-day rush delivery is available *(Telephone orders only)*.

• **Name:** Silvia Dunken  
• **Address:** 4088 Rosemore Drive, Henxington, CA 20698  
• **Phone number:** 506-980-9800  

| Item | Price | Item Number | Total |
| :--- | :--- | :--- | :--- |
| Romance in Switzerland | $28.99 | #43567 | |
| Italy Highlights | $27.99 | #43568 | |
| Marvelous Paris | $28.95 | #43570 | |
| Historical Beauty in London | $29.99 | #43770 | **$115.92** |

• **Regular shipping (7–10 days):** costs $5.95  
• **Express shipping (within 3 days):** costs $10.95  

=== DOCUMENT 3: CUSTOMER REVIEW ===

September 16

Dear Red Hill Customer Service Department,

I am writing to compliment Red Hill Publication on its excellent service and commitment to its quality. I recently ordered the guides to London, Switzerland, Italy and Paris in preparation for a trip to Europe. I paid the charge for regular shipping and was pleasantly surprised when my order arrived in just four days.

When I opened the box, I was even more delighted. The books were outstanding! I was impressed with the beautiful layout and breathtaking photographs even before I left for my vacation.

When I arrived at my destination, I quickly discovered how wonderful they truly are. Every detail was accurate and the guides covered not only famous, must-see sights, but also many little-known places that turned out to be very worth a visit. Had I not ordered books from Red Hill, I am sure I would have missed some worthwhile sightseeing opportunities.

Please count me as a new loyal customer. I have already recommended your books to friends who are planning trips abroad and will continue to do so.

Sincerely,  
Silvia"""

def format_q196_200(text: str) -> str:
    """Reconstruct Wildwood Camping Gear (Triple Passage: Letter, Invoice, Email)."""
    return """=== DOCUMENT 1: BUSINESS LETTER ===

**WILDWOOD CAMPING GEAR**  
259 Bear Court, Mountain View, Colorado 50007  
📞 Phone: 904.555.5555 | ✉️ Email: customerservice@wildwoodcamping.com  

Dear Customer,

Our small, child's raincoats in blue are out-of-stock. We took the liberty of sending one in red because you stated that you need the shipment to arrive before this weekend when you and your son are going camping. All other items should be enclosed, as ordered.

You did not identify a color for the Deluxe Pack so we shipped it in black. We tried to call you about both the color of the Bluebird Pack and the Deluxe Pack. A message was left on your phone.

If your order is over $200, shipping is free. Have a wonderful time camping!

=== DOCUMENT 2: INVOICE ===

### Invoice #4527
• **Bill To:** Renaldo Wise, 749 Mulberry St., Leafmont, Rhode Island 22099  
• **Ship To:** [Same]  

| Item # | Description | Quantity | Cost |
| :--- | :--- | :--- | :--- |
| 7982 | Mountain Tent (for 2) | 1 | $159.99 |
| 1054 | Kid's Bluebird Pack | 1 | $21.97 |
| 1067 | Deluxe Pack | 1 | $89.99 |
| 9856 | Child's Raincoat (Size small, red) | 1 | $19.96 |

• **Subtotal:** $291.91  
• **Tax:** $8.76  
• **Total Due:** **$300.67**  

=== DOCUMENT 3: E-MAIL ===

From: renaldowise@gmail.net  
To: customerservice@wildwoodcamping.com  
Date: September 19  
Subject: Re: Invoice #4527  

I am returning the red child's raincoat using the return label provided. My son is in a blue phase and will wear nothing else. He and I will shop retail for a blue coat on our way out of town.

I am otherwise very happy with your products and service. We assembled the tent in the living room to avoid any surprises while camping, and my son slept in it last night. It meets with his approval.

Please send me an amended invoice (by email is fine) and I will immediately mail you a check for the correct amount.

Sincerely,  
Renaldo Wise"""

def format_q186_190(text: str) -> str:
    """Reconstruct Australian Business Commission (Double Passage: Schedule & Form)."""
    return """=== DOCUMENT 1: SEMINAR SCHEDULE ===

### ABC Australian Business Commission
**"How to build a business from scratch"**

Starting your own business isn't easy and poses unexpected challenges for most. ABC prepares new entrepreneurs with the tools required to make sound decisions about various issues regarding new business startups. In September, we're offering a series of seminars.

The cost of each session is **AUS $95.00** with registration closing three working days before the scheduled seminar. All sessions will be held at the ABC head office located at 512 Downsview in Melbourne. Registration forms can be faxed to 7152387 or mailed to the address indicated on the form.

Online registration is also available on our website: 🌐 **www.abc.org.au** (Click on Registration link).

| Seminar Number | Title | Day | Date | Time |
| :--- | :--- | :--- | :--- | :--- |
| C805 | Hiring Skilled Labor | Monday | September 8 | 12:00 P.M. – 4:00 P.M. |
| C806 | Effective Managing Techniques | Tuesday | September 9 | 4:00 P.M. – 8:00 P.M. |
| C811 | Preparing Company Policies and Protocol | Friday | September 19 | 9:00 A.M. – 1:00 P.M. |
| C825 | Negotiating with Vendors and Suppliers | Tuesday | September 23 | 4:00 P.M. – 8:00 P.M. |

*Note: We reserve the right to cancel a session due to lack of interest. A full refund would be issued.*

=== DOCUMENT 2: REGISTRATION FORM ===

**ABC Australian Business Commission**  
512 Downsview Boulevard, Melbourne, Australia 3831  
📞 Phone: 7152323 | 📠 Fax: 7152387 | 🌐 **www.abc.org.au** | ✉️ email: jhewitt@abc.org  

### REGISTRATION FORM
• **Name:** Sean Raftery  
• **Address:** 111 Elizabeth St, Sydney, NSW, 2000, Australia  
• **Phone:** 5452611 | **Mobile:** 5455667  
• **Email:** sraftery@rafterytextiles.au  
• **Company Name:** Raftery Textiles Limited  
• **Seminar wish to attend:** C825  
• **Participated in an ABC seminar before:** No  
• **Require accommodations:** Yes  
• **Payment Method:** Credit Card (SUPR)  
• **Credit Card Number:** 98765432-12345678  
• **Comments/Requests:** Please contact me by email."""

def format_general_passage(text: str) -> str:
    text = clean_ocr_junk(text)

    # Convert website mentions to browser headers
    text = re.sub(r'(?:https?://|www\.)([a-zA-Z0-9\.\-]+(?:/[^\s]*)?)', r'🌐 **\1**', text)

    # Format email headers
    text = re.sub(r'\b(From\s*:)', r'\n\1', text, flags=re.I)
    text = re.sub(r'\b(To\s*:)', r'\n\1', text, flags=re.I)
    text = re.sub(r'\b(Date\s*:)', r'\n\1', text, flags=re.I)
    text = re.sub(r'\b(Subject\s*:)', r'\n\1', text, flags=re.I)
    text = re.sub(r'\b(Re\s*:)', r'\n\1', text, flags=re.I)

    # Format salutations
    text = re.sub(r'\b(Dear\s+[A-Z][a-zA-Z\s\.,]+,)', r'\n\n\1\n\n', text)
    text = re.sub(r'\b(Sincerely|Best Regards|Warmest Regards|Warm Regards|Regards),?\s*([A-Z][a-zA-Z\s]+)?$', r'\n\n\1,\n\2', text)

    # Format double linebreaks
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def process_bank():
    print(f"Loading {DATA_PATH}...")
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        bank = json.load(f)

    updated_count = 0
    for q in bank:
        if q.get("part") == 7:
            pt = q.get("passageText", "")
            q_num = q.get("questionNumber", 0)
            gid = q.get("groupId", "")

            # Target specific Spartan test passages
            if "redhilltourguides" in pt.lower() or "51601" in pt or (191 <= q_num <= 195 and "sparta-lcrc-test1" in gid):
                q["passageText"] = format_q191_195(pt)
                q["passageType"] = "Webpage, Order Form, and Review"
                updated_count += 1
            elif "wildwood camping" in pt.lower() or (196 <= q_num <= 200 and "sparta-lcrc-test1" in gid):
                q["passageText"] = format_q196_200(pt)
                q["passageType"] = "Letter, Invoice, and E-mail"
                updated_count += 1
            elif "australian business commission" in pt.lower() or (186 <= q_num <= 190 and "sparta-lcrc-test1" in gid):
                q["passageText"] = format_q186_190(pt)
                q["passageType"] = "Schedule and Registration Form"
                updated_count += 1
            else:
                # General cleaning
                cleaned = format_general_passage(pt)
                if cleaned != pt:
                    q["passageText"] = cleaned
                    updated_count += 1

    print(f"Updated {updated_count} Part 7 questions with clean Markdown.")
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(bank, f, ensure_ascii=False, indent=2)

    print("Saved toeic_7parts_comprehensive_bank.json successfully!")

if __name__ == "__main__":
    process_bank()
