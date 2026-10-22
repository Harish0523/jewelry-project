import React, { useEffect, useState } from 'react';
import LanguageContext from './LanguageContext';

const tamilTranslations = {
  'Select language': 'மொழியைத் தேர்ந்தெடுக்கவும்',
  'Fine Jewelry & Craft': 'தரமான நகைகள் மற்றும் கைவினை',
  'Exquisite Craftsmanship & Luxury': 'நேர்த்தியான கைவினையும் ஆடம்பரமும்',
  'Fine Jewelry &': 'தரமான நகைகள் மற்றும்',
  'Custom Manufacturing': 'தனிப்பயன் உற்பத்தி',
  'Explore timeless Gold, Silver, Diamond & Custom-designed Jewelry tailored to perfection.': 'தங்கம், வெள்ளி, வைரம் மற்றும் உங்கள் விருப்பத்திற்கேற்ப வடிவமைக்கப்பட்ட நகைகளைக் கண்டறியுங்கள்.',
  'Explore Collections': 'நகைத் தொகுப்புகளைப் பாருங்கள்',
  'ABOUT ROYAL JEWELS': 'எங்கள் நகைப் பாரம்பரியம்',
  '20+ Years of Crafting Timeless Elegance': '20 ஆண்டுகளுக்கும் மேலான நேர்த்தியான நகை உருவாக்க அனுபவம்',
  'View All →': 'அனைத்தையும் பாருங்கள் →',
  'Exclusive Seasonal Bridal Discount': 'திருமண நகைகளுக்கான பருவகாலச் சிறப்புத் தள்ளுபடி',
  'Get up to 15% off on complete bridal gold sets and customized engagement rings.': 'முழுமையான திருமணத் தங்க நகைத் தொகுப்புகள் மற்றும் தனிப்பயன் நிச்சயதார்த்த மோதிரங்களுக்கு 15% வரை தள்ளுபடி பெறுங்கள்.',
  'Custom Jewelry & Manufacturing': 'தனிப்பயன் நகை மற்றும் உற்பத்தி',
  'Our master craftsmen use advanced 3D CAD modeling and traditional handcrafting to bring your dream jewelry to life.': 'உங்கள் கனவு நகையை உருவாக்க எங்கள் கைவினைஞர்கள் மேம்பட்ட 3D CAD வடிவமைப்பையும் பாரம்பரிய கைவினை முறையையும் பயன்படுத்துகிறார்கள்.',
  'Glimpse of our crafted masterpieces': 'எங்கள் கைவினைப் படைப்புகளின் ஒரு பார்வை',
  'What Our Clients Say': 'எங்கள் வாடிக்கையாளர்கள் கூறுவது',
  'Trusted by families for generations': 'தலைமுறைகள் கடந்து குடும்பங்கள் நம்பும் நிறுவனம்',
  'All Item Types': 'அனைத்து நகை வகைகளும்',
  'All Items': 'அனைத்து நகைகளும்',
  'Rings (மோதிரம்)': 'மோதிரங்கள்',
  'Chains (சங்கிலி)': 'சங்கிலிகள்',
  'Necklaces (அட்டிகை)': 'நெக்லஸ்கள்',
  'Bangles (வளையல்)': 'வளையல்கள்',
  'Earrings (தோடு)': 'காதணிகள்',
  'Home': 'முகப்பு',
  'Collections': 'நகை வகைகள்',
  'All Collections': 'அனைத்து நகைகள்',
  'Gold Jewelry': 'தங்க நகைகள்',
  'Silver Jewelry': 'வெள்ளி நகைகள்',
  'Diamond Jewelry': 'வைர நகைகள்',
  'Bridal Jewelry': 'திருமண நகைகள்',
  'Custom Design': 'தனிப்பயன் வடிவமைப்பு',
  'Manufacturing': 'உற்பத்தி',
  'Gallery': 'படத்தொகுப்பு',
  'Offers': 'சலுகைகள்',
  'Special Offers': 'சிறப்பு சலுகைகள்',
  'FAQ': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
  'About Us': 'எங்களைப் பற்றி',
  'Contact': 'தொடர்பு',
  'Contact Us': 'தொடர்பு கொள்ள',
  'Toggle menu': 'மெனுவைத் திறக்கவும்',
  'Call Now': 'இப்போது அழைக்கவும்',
  'Chat on WhatsApp': 'WhatsApp-இல் உரையாடுங்கள்',
  'Our Products': 'எங்கள் நகைகள்',
  'Testimonials': 'வாடிக்கையாளர் கருத்துகள்',
  'Quick Links': 'விரைவு இணைப்புகள்',
  'Jewelry Collections': 'நகைத் தொகுப்புகள்',
  'Customer Care & Legal': 'வாடிக்கையாளர் சேவை மற்றும் சட்டத் தகவல்',
  'Follow Our Craft': 'எங்கள் கைவினைப் பணிகளைப் பின்தொடருங்கள்',
  'Privacy Policy': 'தனியுரிமைக் கொள்கை',
  'Terms & Conditions': 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',
  'All Rights Reserved.': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
  'OUR CATEGORIES': 'எங்கள் நகை வகைகள்',
  'Featured Products': 'சிறப்புத் தேர்வு நகைகள்',
  'Handpicked designs for special moments': 'சிறப்பான தருணங்களுக்காகத் தேர்ந்தெடுக்கப்பட்ட வடிவமைப்புகள்',
  '100% Certified Gold': '100% சான்றளிக்கப்பட்ட தங்கம்',
  'Master Artisans': 'திறமையான கைவினைஞர்கள்',
  'Read More About Us': 'எங்களைப் பற்றி மேலும் அறிக',
  'View Gallery': 'படத்தொகுப்பைப் பாருங்கள்',
  'All Reviews': 'அனைத்து கருத்துகளும்',
  'Have a Unique Jewelry Design in Mind?': 'உங்களிடம் தனித்துவமான நகை வடிவமைப்பு யோசனை உள்ளதா?',
  'Have Questions Before Ordering?': 'ஆர்டர் செய்வதற்கு முன் கேள்விகள் உள்ளனவா?',
  'Find quick answers about purity certifications, custom timelines, and nationwide delivery.': 'தங்கத் தூய்மைச் சான்றுகள், தனிப்பயன் தயாரிப்பு காலம் மற்றும் நாடு முழுவதும் விநியோகம் பற்றிய பதில்களைப் பெறுங்கள்.',
  'Direct WhatsApp Assistance': 'WhatsApp மூலம் நேரடி உதவி',
  'Chat directly with our jewelry consultants for instant custom quotes.': 'தனிப்பயன் விலை விவரங்களுக்கு எங்கள் நகை ஆலோசகர்களுடன் நேரடியாக உரையாடுங்கள்.',
  'View Details': 'விவரங்களைப் பாருங்கள்',
  'View Spec': 'விவரக்குறிப்புகளைப் பாருங்கள்',
  'Est. Price:': 'மதிப்பிடப்பட்ட விலை:',
  'Inquire via WhatsApp': 'WhatsApp மூலம் விசாரிக்கவும்',
  'Inquire / Request Quote on WhatsApp': 'WhatsApp மூலம் விசாரிக்கவும் / விலைப்புள்ளி கோரவும்',
  'Inquire on WhatsApp': 'WhatsApp மூலம் விசாரிக்கவும்',
  'About': 'எங்களைப் பற்றி',
  'Atelier Harx': 'Atelier Harx',
  'Our Legacy & Heritage': 'எங்கள் பாரம்பரியம்',
  'Crafting fine 22K Gold and VVS Diamond jewelry in Chavakachcheri, Jaffna with unmatched perfection, modern elegance, and traditional purity.': 'யாழ்ப்பாணம் சாவகச்சேரியில் 22K தங்கம் மற்றும் VVS வைர நகைகளை நவீன நேர்த்தியுடனும் பாரம்பரியத் தூய்மையுடனும் நாங்கள் உருவாக்குகிறோம்.',
  '100% Certified Purity': '100% சான்றளிக்கப்பட்ட தூய்மை',
  'Every gold, diamond, and silver piece comes with official hallmark authentication guaranteeing exact karat weight.': 'ஒவ்வொரு தங்கம், வைரம் மற்றும் வெள்ளி நகைக்கும் சரியான காரட் எடையை உறுதிப்படுத்தும் அதிகாரப்பூர்வ முத்திரைச் சான்று வழங்கப்படுகிறது.',
  'Master Goldsmiths': 'திறமையான பொற்கொல்லர்கள்',
  'Handcrafted by experienced artisans specializing in bespoke bridal sets and modern haute-joaillerie motifs.': 'தனிப்பயன் திருமண நகைகள் மற்றும் நவீன வடிவமைப்புகளில் அனுபவமுள்ள கைவினைஞர்களால் கையால் உருவாக்கப்படுகிறது.',
  'Bespoke Workshop': 'தனிப்பயன் நகைப் பட்டறை',
  'From initial 3D CAD modeling to final stone polish, all steps are executed under one roof at Atelier Harx.': 'தொடக்க 3D CAD மாதிரி வடிவமைப்பிலிருந்து இறுதி கல் மெருகூட்டல் வரை அனைத்து பணிகளும் Atelier Harx பட்டறையிலேயே நடைபெறுகின்றன.',
  'Our Promise to': 'எங்கள் உறுதி',
  'Every Customer': 'ஒவ்வொரு வாடிக்கையாளருக்கும்',
  'At Atelier Harx, we believe fine jewelry is an heirloom passed down generations. Our Chavakachcheri workshop ensures full transparency, zero hidden charges, and lifelong maintenance.': 'தரமான நகைகள் தலைமுறைகள் கடந்து செல்லும் குடும்பச் சொத்து என்று Atelier Harx நம்புகிறது. எங்கள் சாவகச்சேரி பட்டறையில் முழு வெளிப்படைத்தன்மை, மறைமுகக் கட்டணமின்மை மற்றும் வாழ்நாள் பராமரிப்பு வழங்கப்படுகிறது.',
  'Ethically sourced gold, certified VVS diamonds & gems': 'நெறிமுறையுடன் பெறப்பட்ட தங்கம், சான்றளிக்கப்பட்ட VVS வைரங்கள் மற்றும் ரத்தினங்கள்',
  'Transparent weight calculations & exact hallmark stamping': 'வெளிப்படையான எடை கணக்கீடு மற்றும் துல்லியமான முத்திரையிடல்',
  'Lifetime cleaning, inspection and polishing guarantee': 'வாழ்நாள் சுத்தம், பரிசோதனை மற்றும் மெருகூட்டல் உத்தரவாதம்',
  'Visit Our Showroom': 'எங்கள் நகைக்கடைக்கு வருகை தாருங்கள்',
  'Kandy Road, Chavakachcheri, Jaffna, Sri Lanka': 'இலங்கை, யாழ்ப்பாணம், சாவகச்சேரி, கண்டி வீதி',
  'Showroom Address': 'நகைக்கடை முகவரி',
  'Direct Phone': 'நேரடி தொலைபேசி',
  'Start WhatsApp Chat': 'WhatsApp உரையாடலைத் தொடங்குங்கள்',
  'Opening Hours': 'திறந்திருக்கும் நேரம்',
  'Send Us a Message': 'எங்களுக்கு செய்தி அனுப்புங்கள்',
  'Message Sent via WhatsApp!': 'WhatsApp மூலம் செய்தி தயாராகிவிட்டது!',
  'Your Full Name *': 'உங்கள் முழுப் பெயர் *',
  'Phone / WhatsApp Number *': 'தொலைபேசி / WhatsApp எண் *',
  'Email Address (Optional)': 'மின்னஞ்சல் முகவரி (விருப்பம்)',
  'Inquiry Type': 'விசாரணை வகை',
  'Custom Jewelry Request': 'தனிப்பயன் நகை கோரிக்கை',
  'Bridal Collection Pricing': 'திருமண நகைத் தொகுப்பு விலை',
  'Showroom VIP Appointment': 'நகைக்கடை சிறப்பு சந்திப்பு',
  'Gold Purity Certification': 'தங்கத் தூய்மைச் சான்றிதழ்',
  'General Inquiry': 'பொதுவான விசாரணை',
  'Submit Inquiry via WhatsApp': 'WhatsApp மூலம் விசாரணையை அனுப்புங்கள்',
  'Custom': 'தனிப்பயன்',
  'Jewelry Design': 'நகை வடிவமைப்பு',
  'How Custom Design Works': 'தனிப்பயன் வடிவமைப்பு செயல்முறை',
  'Share Your Design Idea': 'உங்கள் வடிவமைப்பு யோசனையைப் பகிருங்கள்',
  '3D CAD Modeling & Price Quote': '3D CAD மாதிரி மற்றும் விலைப்புள்ளி',
  'Handcrafting & Hallmarking': 'கைவினை உருவாக்கம் மற்றும் முத்திரையிடல்',
  'Submit Custom Order Request': 'தனிப்பயன் ஆர்டர் கோரிக்கையைச் சமர்ப்பிக்கவும்',
  'Your Name': 'உங்கள் பெயர்',
  'WhatsApp / Phone Number': 'WhatsApp / தொலைபேசி எண்',
  'Metal Category': 'உலோக வகை',
  '22K Gold': '22K தங்கம்',
  '18K Diamond': '18K தங்கம் மற்றும் வைரம்',
  '925 Silver': '925 வெள்ளி',
  'Weight / Budget': 'எடை / பட்ஜெட்',
  'Design Instructions': 'வடிவமைப்பு விவரங்கள்',
  'Design Image': 'வடிவமைப்பு படம்',
  '(optional)': '(விருப்பம்)',
  'Choose a reference image': 'மாதிரிப் படத்தைத் தேர்ந்தெடுக்கவும்',
  'JPG, PNG, or other image up to 5 MB': 'JPG, PNG அல்லது 5 MB-க்குள் உள்ள படம்',
  'Remove design image': 'வடிவமைப்பு படத்தை நீக்கவும்',
  'After WhatsApp opens, attach the selected image in the chat.': 'WhatsApp திறந்ததும், தேர்ந்தெடுத்த படத்தை உரையாடலில் இணைக்கவும்.',
  'Your image will be included in the share sheet. Choose WhatsApp to send it.': 'பகிர்வு விருப்பங்களில் உங்கள் படம் சேர்க்கப்படும். அனுப்ப WhatsApp-ஐத் தேர்ந்தெடுக்கவும்.',
  'Frequently Asked': 'அடிக்கடி கேட்கப்படும்',
  'Questions': 'கேள்விகள்',
  'Customer Support': 'வாடிக்கையாளர் உதவி',
  'Purity & Certification': 'தூய்மை மற்றும் சான்றிதழ்',
  'Pricing & Weight': 'விலை மற்றும் எடை',
  'Orders & Delivery': 'ஆர்டர்கள் மற்றும் விநியோகம்',
  'Showroom Visit': 'நகைக்கடை வருகை',
  'Are all gold and silver jewelry hallmarked?': 'அனைத்து தங்கம் மற்றும் வெள்ளி நகைகளுக்கும் முத்திரை உள்ளதா?',
  'Yes! Every piece crafted or sold at Atelier Harx comes with official 22K (916) or 24K hallmark certification ensuring 100% purity and authentic metal weight standards.': 'ஆம்! Atelier Harx-இல் உருவாக்கப்படும் அல்லது விற்கப்படும் ஒவ்வொரு நகைக்கும் 100% தூய்மை மற்றும் சரியான உலோக எடையை உறுதிப்படுத்தும் 22K (916) அல்லது 24K அதிகாரப்பூர்வ முத்திரைச் சான்று வழங்கப்படுகிறது.',
  'How long does a custom jewelry design order take?': 'தனிப்பயன் நகை ஆர்டரை உருவாக்க எவ்வளவு காலம் ஆகும்?',
  'Standard custom jewelry (rings, bangles, pendants) takes 5 to 10 working days. Intricate bridal sets and 3D CAD custom designs take approximately 10 to 14 days from design approval.': 'வழக்கமான தனிப்பயன் நகைகள் (மோதிரங்கள், வளையல்கள், பதக்கங்கள்) உருவாக்க 5 முதல் 10 வேலை நாட்கள் ஆகும். நுணுக்கமான திருமண நகைகள் மற்றும் 3D CAD வடிவமைப்புகளுக்கு ஒப்புதல் கிடைத்த பின் சுமார் 10 முதல் 14 நாட்கள் ஆகும்.',
  'How are custom jewelry prices calculated?': 'தனிப்பயன் நகைகளின் விலை எவ்வாறு கணக்கிடப்படுகிறது?',
  'Our pricing is completely transparent: Total Price = (Live Gold Rate × Weight in Grams/Sovereign) + Making Charges + Gem/Stone costs. No hidden fees.': 'எங்கள் விலை கணக்கீடு முழுமையாக வெளிப்படையானது: மொத்த விலை = (அன்றைய தங்க விலை × கிராம் / பவுன் எடை) + செய்கூலி + ரத்தினக் கல் விலை. மறைமுகக் கட்டணம் இல்லை.',
  'Can I bring my own gold to melt and make a new design?': 'எனது தங்கத்தை கொடுத்து உருக்கி புதிய நகை செய்ய முடியுமா?',
  'Yes, we accept old gold for exchange or melting. Our master goldsmiths perform on-site purity testing before processing your new bespoke piece.': 'ஆம், பழைய தங்கத்தை மாற்றாகவோ உருக்கிப் பயன்படுத்தவோ ஏற்றுக்கொள்கிறோம். புதிய நகையை உருவாக்குவதற்கு முன் எங்கள் பொற்கொல்லர்கள் தங்கத்தின் தூய்மையைப் பரிசோதிப்பார்கள்.',
  'How can I place an order online or enquire?': 'இணையத்தில் ஆர்டர் செய்வது அல்லது விசாரிப்பது எப்படி?',
  'You can explore our Collections or Custom Design page and click the "Enquire via WhatsApp" button. Our team will assist you with quotes, weight estimations, and order placement.': 'எங்கள் நகைத் தொகுப்புகள் அல்லது தனிப்பயன் வடிவமைப்பு பக்கத்திற்குச் சென்று "WhatsApp மூலம் விசாரிக்கவும்" என்பதைத் தேர்ந்தெடுக்கவும். விலைப்புள்ளி, எடை மதிப்பீடு மற்றும் ஆர்டர் செய்ய எங்கள் குழு உதவும்.',
  'Where is the Atelier Harx workshop & showroom located?': 'Atelier Harx பட்டறை மற்றும் நகைக்கடை எங்கு உள்ளது?',
  'Our main showroom and manufacturing workshop are located at Kandy Road, Chavakachcheri, Jaffna, Sri Lanka.': 'எங்கள் நகைக்கடை மற்றும் உற்பத்திப் பட்டறை இலங்கை, யாழ்ப்பாணம், சாவகச்சேரி, கண்டி வீதியில் அமைந்துள்ளது.',
  'Search questions (e.g. purity, custom order, location)...': 'கேள்விகளைத் தேடுங்கள் (எ.கா. தூய்மை, தனிப்பயன் ஆர்டர், இடம்)...',
  'No matching questions found. Feel free to contact our WhatsApp desk directly!': 'பொருத்தமான கேள்விகள் இல்லை. WhatsApp மூலம் எங்களைத் தொடர்புகொள்ளுங்கள்!',
  'Have More Questions?': 'மேலும் கேள்விகள் உள்ளனவா?',
  'Ask on WhatsApp': 'WhatsApp-இல் கேளுங்கள்',
  'Masterpiece': 'சிறந்த படைப்புகள்',
  'Filter By Item Type:': 'நகை வகையின்படி வடிகட்டவும்:',
  'Order Similar Custom Design on WhatsApp': 'இதேபோன்ற தனிப்பயன் வடிவமைப்பை WhatsApp-இல் ஆர்டர் செய்யுங்கள்',
  'Jewelry': 'நகைகள்',
  'Manufacturing Services': 'உற்பத்திச் சேவைகள்',
  'CRAFT & PRECISION': 'கைவினைத் திறன் மற்றும் துல்லியம்',
  'Custom Jewelry Design': 'தனிப்பயன் நகை வடிவமைப்பு',
  'Bulk & Wholesale Orders': 'மொத்த மற்றும் வணிக ஆர்டர்கள்',
  'Quality & Craftsmanship': 'தரம் மற்றும் கைவினைத் திறன்',
  'B2B Gold & Silver Batch Production': 'வணிகத்திற்கான தங்கம் மற்றும் வெள்ளி மொத்த உற்பத்தி',
  'Consistent Hallmark Standard Certification': 'சீரான தர முத்திரைச் சான்றிதழ்',
  '100% Purity Certified Gold': '100% தூய்மைச் சான்றளிக்கப்பட்ட தங்கம்',
  'Master Artisans with 20+ Years Experience': '20 ஆண்டுகளுக்கும் மேலான அனுபவமுள்ள கைவினைஞர்கள்',
  'HOW WE WORK': 'எங்கள் செயல்முறை',
  'The Manufacturing Process': 'உற்பத்தி செயல்முறை',
  'START YOUR BESPOKE ORDER': 'தனிப்பயன் ஆர்டரைத் தொடங்குங்கள்',
  'Ready to Craft Your Custom Piece?': 'உங்கள் தனிப்பயன் நகையை உருவாக்கத் தயாரா?',
  'Visit Showroom': 'நகைக்கடைக்கு வருகை தாருங்கள்',
  'Offers &': 'சலுகைகள் மற்றும்',
  'Deals': 'விற்பனைகள்',
  'Special Promotions': 'சிறப்புச் சலுகைகள்',
  'Exclusive seasonal promotional offers on jewelry making charges.': 'நகை செய்கூலியில் பருவகாலச் சிறப்புச் சலுகைகள்.',
  'Bridal Wedding Set Package': 'திருமண நகைத் தொகுப்பு',
  'Reduced Making Charges': 'குறைக்கப்பட்ட செய்கூலி',
  'Wedding Special': 'திருமணச் சிறப்புச் சலுகை',
  'Special discounts on making charges for full traditional Jaffna bridal sets.': 'பாரம்பரிய யாழ்ப்பாணத் திருமண நகைத் தொகுப்புகளின் செய்கூலியில் சிறப்புத் தள்ளுபடி.',
  '925 Sterling Silver Collection': '925 ஸ்டெர்லிங் வெள்ளித் தொகுப்பு',
  'Flat 15% Discount': 'நேரடி 15% தள்ளுபடி',
  'Limited Offer': 'குறிப்பிட்ட காலச் சலுகை',
  'Flat 15% off on all handcrafted silver chains, anklets, and bangles.': 'கையால் செய்யப்பட்ட வெள்ளிச் சங்கிலிகள், கொலுசுகள் மற்றும் வளையல்களுக்கு 15% தள்ளுபடி.',
  'Claim Offer via WhatsApp': 'WhatsApp மூலம் சலுகையைப் பெறுங்கள்',
  'Words From Our': 'எங்கள் வாடிக்கையாளர்களின்',
  'Patrons': 'கருத்துகள்',
  'Client Stories': 'வாடிக்கையாளர் அனுபவங்கள்',
  'Overall Customer Rating': 'மொத்த வாடிக்கையாளர் மதிப்பீடு',
  '100% Certified': '100% சான்றளிக்கப்பட்டது',
  '22K & VVS Hallmark Guarantee': '22K மற்றும் VVS முத்திரை உத்தரவாதம்',
  '20+ Years': '20 ஆண்டுகளுக்கும் மேல்',
  'Goldsmithing Legacy in Jaffna': 'யாழ்ப்பாணத்தின் பொற்கொல்லர் பாரம்பரியம்',
  'Share Your Review': 'உங்கள் கருத்தைப் பகிருங்கள்',
  'Your review is ready in WhatsApp': 'உங்கள் கருத்து WhatsApp-இல் தயாராக உள்ளது',
  'Tap Send in WhatsApp to share it with our showroom team.': 'எங்கள் நகைக்கடை குழுவிற்கு அனுப்ப WhatsApp-இல் Send என்பதைத் தட்டுங்கள்.',
  'Your name *': 'உங்கள் பெயர் *',
  'Your location *': 'உங்கள் இருப்பிடம் *',
  'Jewelry purchased': 'வாங்கிய நகை',
  'Your rating *': 'உங்கள் மதிப்பீடு *',
  'Choose a rating from 1 to 5 stars': '1 முதல் 5 நட்சத்திரங்கள் வரை மதிப்பீட்டைத் தேர்ந்தெடுக்கவும்',
  'Your review *': 'உங்கள் கருத்து *',
  'Your review opens in WhatsApp for you to send.': 'உங்கள் கருத்து WhatsApp-இல் திறக்கும்; அங்கிருந்து அனுப்பலாம்.',
  'Privacy': 'தனியுரிமை',
  'Policy': 'கொள்கை',
  'Terms &': 'விதிமுறைகள் மற்றும்',
  'Conditions': 'நிபந்தனைகள்',
  'Information We Collect': 'நாங்கள் சேகரிக்கும் தகவல்கள்',
  'How We Use Your Information': 'உங்கள் தகவல்களை நாங்கள் பயன்படுத்தும் விதம்',
  'Data Protection & Security': 'தரவு பாதுகாப்பு',
  'Contact Us regarding Privacy': 'தனியுரிமை தொடர்பாக எங்களைத் தொடர்புகொள்ளுங்கள்',
  'Back to Collections': 'நகைத் தொகுப்புகளுக்குத் திரும்புங்கள்',
  'Atelier Signature Creation': 'Atelier-இன் தனித்துவமான படைப்பு',
  'Product Inquiry Form': 'நகை விசாரணைப் படிவம்',
  'Send Inquiry via WhatsApp': 'WhatsApp மூலம் விசாரணையை அனுப்புங்கள்',
  'Close modal': 'சாளரத்தை மூடுங்கள்',
  'Enquire on WhatsApp': 'WhatsApp மூலம் விசாரிக்கவும்',
  'Have You Crafted Jewelry With Us?': 'எங்களிடம் நகை செய்துள்ளீர்களா?',
  'Custom design, traditional purity, and trusted service for every generation.': 'ஒவ்வொரு தலைமுறைக்கும் தனிப்பயன் வடிவமைப்பு, பாரம்பரியத் தூய்மை மற்றும் நம்பகமான சேவை.',
  'We specialize in fine jewelry manufacturing and bespoke designs. Every piece is crafted with certified materials, ensuring authentic purity and superior quality.': 'தரமான நகை உற்பத்தி மற்றும் தனிப்பயன் வடிவமைப்பில் நாங்கள் நிபுணத்துவம் பெற்றவர்கள். ஒவ்வொரு நகையும் சான்றளிக்கப்பட்ட பொருட்களால் உருவாக்கப்பட்டு, உண்மையான தூய்மையும் சிறந்த தரமும் உறுதி செய்யப்படுகிறது.',
  'View All': 'அனைத்தையும் பாருங்கள்',
  'View All Offers': 'அனைத்து சலுகைகளையும் பாருங்கள்',
  'Custom Order': 'தனிப்பயன் ஆர்டர்',
  'Our Process': 'எங்கள் செயல்முறை',
  'Jewelry Gallery': 'நகைப் படத்தொகுப்பு',
  'The custom bridal necklace turned out even better than the design model. Exceptional service!': 'தனிப்பயன் திருமண நெக்லஸ் வடிவமைப்பு மாதிரியை விட அழகாக வந்தது. சிறந்த சேவை!',
  'High quality 22K gold bangles. Very transparent pricing and quick WhatsApp communication.': 'உயர்தர 22K தங்க வளையல்கள். வெளிப்படையான விலை மற்றும் விரைவான WhatsApp தொடர்பு.',
  'Beautiful solitaire diamond ring. Highly recommend Atelier Harx for luxury pieces.': 'அழகான ஒற்றைக் கல் வைர மோதிரம். உயர்தர நகைகளுக்கு Atelier Harx-ஐ மிகவும் பரிந்துரைக்கிறேன்.',
  'Read FAQs': 'கேள்வி பதில்களைப் பாருங்கள்',
  'Exclusive Catalogue': 'சிறப்புத் தொகுப்பு',
  'Click on any creation below to view complete weight, live estimated pricing & purity specifications.': 'எடை, தற்போதைய மதிப்பிடப்பட்ட விலை மற்றும் தூய்மை விவரங்களைக் காண கீழே உள்ள நகையைத் தேர்ந்தெடுக்கவும்.',
  'Necklaces': 'நெக்லஸ்கள்',
  'Rings': 'மோதிரங்கள்',
  'Bangles': 'வளையல்கள்',
  'Earrings': 'காதணிகள்',
  'No items found under the selected category & type filter.': 'தேர்ந்தெடுத்த வகை மற்றும் வடிகட்டியில் நகைகள் எதுவும் இல்லை.',
  'Estimated Price:': 'மதிப்பிடப்பட்ட விலை:',
  'Metal Weight:': 'உலோக எடை:',
  'Hallmark Quality:': 'தர முத்திரை:',
  'Hallmark Authentication:': 'தர முத்திரைச் சான்று:',
  'Workshop Craft:': 'பட்டறை:',
  'Custom Crafted:': 'தனிப்பயனாக உருவாக்கப்பட்டது:',
  '100% Certified 22K (916)': '100% சான்றளிக்கப்பட்ட 22K (916)',
  'Certified Hallmark Standard': 'சான்றளிக்கப்பட்ட தர முத்திரை',
  'Close Window': 'சாளரத்தை மூடுங்கள்',
  'Item Code:': 'நகைக் குறியீடு:',
  'Ref Code:': 'குறிப்புக் குறியீடு:',
  'Purity Certification:': 'தூய்மைச் சான்றிதழ்:',
  'Approximate Weight:': 'தோராயமான எடை:',
  'Gemstones:': 'ரத்தினக் கற்கள்:',
  'Custom Making Time:': 'தனிப்பயன் தயாரிப்பு காலம்:',
  'Direct WhatsApp Inquiry': 'WhatsApp மூலம் நேரடி விசாரணை',
  'Call Store Consultant': 'கடையின் ஆலோசகரை அழைக்கவும்',
  'Back to Product Specs': 'நகை விவரங்களுக்குத் திரும்புங்கள்',
  'Inquiring about': 'விசாரிக்கும் நகை:',
  'WhatsApp Number *': 'WhatsApp எண் *',
  'Size / Customization Notes': 'அளவு / தனிப்பயன் விவரங்கள்',
  'Cancel': 'ரத்து செய்',
  'DIRECT INQUIRY': 'நேரடி விசாரணை',
  'Have a custom jewelry query or pricing request? Fill out the form below for instant assistance.': 'தனிப்பயன் நகை அல்லது விலை தொடர்பான கேள்வியா? உடனடி உதவிக்கு கீழே உள்ள படிவத்தை நிரப்புங்கள்.',
  'Thank you for contacting Atelier Harx. Our consultants will get back to you shortly.': 'Atelier Harx-ஐ தொடர்புகொண்டதற்கு நன்றி. எங்கள் ஆலோசகர்கள் விரைவில் உங்களைத் தொடர்புகொள்வார்கள்.',
  'Inquiry Category': 'விசாரணை வகை',
  'Message Details *': 'செய்தி விவரங்கள் *',
  'SHOWROOM LOCATION': 'நகைக்கடை அமைவிடம்',
  'Visit Our Chavakachcheri Workshop': 'எங்கள் சாவகச்சேரி பட்டறைக்கு வருகை தாருங்கள்',
  'Experience our master artisans at work and explore certified gold & custom jewelry designs in person.': 'எங்கள் கைவினைஞர்கள் பணிபுரிவதைப் பாருங்கள்; சான்றளிக்கப்பட்ட தங்கம் மற்றும் தனிப்பயன் நகை வடிவமைப்புகளை நேரில் அறிந்துகொள்ளுங்கள்.',
  'Chavakachcheri Town Center, Jaffna': 'யாழ்ப்பாணம், சாவகச்சேரி நகர மையம்',
  'Get Directions': 'வழியைப் பெறுங்கள்',
  'Get Directions →': 'வழியைப் பெறுங்கள் →',
  'Contact Atelier Harx': 'Atelier Harx-ஐ தொடர்புகொள்ளுங்கள்',
  'DIRECT PHONE': 'நேரடி தொலைபேசி',
  'Available during business hours.': 'வேலை நேரத்தில் தொடர்புகொள்ளலாம்.',
  'Mon – Sat: 9:00 AM – 7:00 PM': 'திங்கள் – சனி: காலை 9:00 – மாலை 7:00',
  'Sunday: 9:30 AM – 2:00 PM': 'ஞாயிறு: காலை 9:30 – பிற்பகல் 2:00',
  'Turn your vision into reality. Share your sketch or idea with our master goldsmiths.': 'உங்கள் யோசனையை நனவாக்குங்கள். உங்கள் வரைபடம் அல்லது எண்ணத்தை எங்கள் பொற்கொல்லர்களுடன் பகிருங்கள்.',
  'Send us a photo, sketch, or custom pattern via WhatsApp.': 'புகைப்படம், வரைபடம் அல்லது தனிப்பயன் வடிவத்தை WhatsApp மூலம் அனுப்புங்கள்.',
  'We generate accurate digital previews and exact weight estimates.': 'துல்லியமான டிஜிட்டல் மாதிரிகளையும் எடை மதிப்பீடுகளையும் உருவாக்குகிறோம்.',
  'Master goldsmiths cast, polish, and hallmark stamp your ornament.': 'எங்கள் பொற்கொல்லர்கள் உங்கள் நகையை வார்த்து, மெருகூட்டி, தர முத்திரையிடுவார்கள்.',
  'Full Name': 'முழுப் பெயர்',
  'Sovereigns (Pavan)': 'பவுன்',
  'Describe gem choices, ring size, or necklace patterns...': 'கல் வகை, மோதிர அளவு அல்லது நெக்லஸ் வடிவத்தை விவரிக்கவும்...',
  'Choose an image file to continue.': 'தொடர படக் கோப்பைத் தேர்ந்தெடுக்கவும்.',
  'Image must be 5 MB or smaller.': 'படம் 5 MB அல்லது அதற்குக் குறைவாக இருக்க வேண்டும்.',
  'Send Order Request via WhatsApp': 'WhatsApp மூலம் ஆர்டர் கோரிக்கையை அனுப்புங்கள்',
  'Photo of actual custom orders hand-crafted at our Atelier Harx workshop in Jaffna with estimated pricing.': 'யாழ்ப்பாணம் Atelier Harx பட்டறையில் உருவாக்கப்பட்ட தனிப்பயன் நகைகளின் புகைப்படங்களும் மதிப்பிடப்பட்ட விலைகளும்.',
  'Real Creations & Showcase': 'உண்மையான நகைப் படைப்புகள்',
  'No gallery items found for the selected type filter.': 'தேர்ந்தெடுத்த வகையில் படத்தொகுப்பு நகைகள் இல்லை.',
  'Close': 'மூடுங்கள்',
  'Customer Agreement': 'வாடிக்கையாளர் ஒப்பந்தம்',
  'Last Updated: October 2026 • Atelier Harx, Chavakachcheri, Jaffna': 'கடைசியாகப் புதுப்பிக்கப்பட்டது: அக்டோபர் 2026 • Atelier Harx, சாவகச்சேரி, யாழ்ப்பாணம்',
  'Effective: October 2026 • Atelier Harx, Fine Jewelry & Craft': 'நடைமுறைக்கு வரும் தேதி: அக்டோபர் 2026 • Atelier Harx, தரமான நகைகள் மற்றும் கைவினை',
  '1. Information We Collect': '1. நாங்கள் சேகரிக்கும் தகவல்கள்',
  'When you submit a custom jewelry design inquiry or contact us via WhatsApp, we collect basic details including your name, telephone number, email, and design descriptions/sketches. We do not collect online credit card details directly on this site.': 'தனிப்பயன் நகை வடிவமைப்பு விசாரணையைச் சமர்ப்பிக்கும்போது அல்லது WhatsApp மூலம் தொடர்புகொள்ளும்போது, உங்கள் பெயர், தொலைபேசி எண், மின்னஞ்சல், வடிவமைப்பு விவரம் அல்லது வரைபடம் போன்ற அடிப்படைத் தகவல்களைச் சேகரிக்கிறோம். இந்த இணையதளத்தில் கடன் அட்டை விவரங்களை நேரடியாகச் சேகரிப்பதில்லை.',
  '2. How We Use Your Information': '2. உங்கள் தகவல்களை நாங்கள் பயன்படுத்தும் விதம்',
  'To provide accurate 3D CAD modeling previews and custom gold quotes.': 'துல்லியமான 3D CAD மாதிரிகளையும் தனிப்பயன் தங்க நகை விலைப்புள்ளிகளையும் வழங்க.',
  'To communicate order status, hallmark verification, and delivery timelines.': 'ஆர்டர் நிலை, தர முத்திரை சரிபார்ப்பு மற்றும் விநியோக காலத்தைத் தெரிவிக்க.',
  'To notify you of exclusive seasonal offers and making charge discounts (if opted-in).': 'நீங்கள் விரும்பினால், பருவகாலச் சலுகைகள் மற்றும் செய்கூலி தள்ளுபடிகளைத் தெரிவிக்க.',
  '3. Data Protection & Security': '3. தரவு பாதுகாப்பு',
  'Your personal information and custom design sketches are treated with absolute confidentiality. We never sell, rent, or trade customer information to third parties.': 'உங்கள் தனிப்பட்ட தகவல்களும் வடிவமைப்பு வரைபடங்களும் ரகசியமாகப் பாதுகாக்கப்படும். வாடிக்கையாளர் தகவல்களை மூன்றாம் தரப்பினருக்கு விற்பதோ, வாடகைக்கு விடுவதோ, பரிமாறுவதோ இல்லை.',
  '4. Contact Us regarding Privacy': '4. தனியுரிமை தொடர்பாக எங்களைத் தொடர்புகொள்ளுங்கள்',
  'If you have any questions regarding your personal information, please visit our showroom on Kandy Road, Chavakachcheri, Jaffna or call us at': 'உங்கள் தனிப்பட்ட தகவல்கள் தொடர்பாகக் கேள்விகள் இருந்தால், யாழ்ப்பாணம் சாவகச்சேரி கண்டி வீதியில் உள்ள எங்கள் நகைக்கடைக்கு வருகை தாருங்கள் அல்லது எங்களை அழைக்கவும்',
  '1. Hallmark Purity & Weight Guarantee': '1. தர முத்திரைத் தூய்மை மற்றும் எடை உத்தரவாதம்',
  'All 22K Gold and 925 Sterling Silver products sold by Atelier Harx undergo rigorous quality checks and carry official hallmark authentication. Final prices reflect exact weight measurements at our certified digital scales.': 'Atelier Harx விற்கும் அனைத்து 22K தங்கம் மற்றும் 925 ஸ்டெர்லிங் வெள்ளி நகைகளும் கடுமையான தரச் சோதனைக்கு உட்படுத்தப்பட்டு அதிகாரப்பூர்வ முத்திரைச் சான்று பெறுகின்றன. சான்றளிக்கப்பட்ட டிஜிட்டல் தராசில் அளந்த துல்லியமான எடையின் அடிப்படையில் இறுதி விலை நிர்ணயிக்கப்படும்.',
  '2. Custom Design Orders & Tolerances': '2. தனிப்பயன் வடிவமைப்பு ஆர்டர்கள் மற்றும் எடை வேறுபாடுகள்',
  'Custom-designed hand-crafted jewelry may have minor weight variations (±0.1g to 0.3g) due to hand-polishing and casting processes. Final pricing will be updated according to the exact weight produced upon completion.': 'கையால் உருவாக்கப்படும் தனிப்பயன் நகைகளில் மெருகூட்டல் மற்றும் வார்ப்பு செயல்முறைகளால் சிறிய எடை வேறுபாடுகள் (±0.1g முதல் 0.3g வரை) ஏற்படலாம். தயாரிப்பு முடிந்ததும் கிடைக்கும் துல்லியமான எடைக்கேற்ப இறுதி விலை புதுப்பிக்கப்படும்.',
  '3. Pricing & Gold Market Rates': '3. விலை மற்றும் தங்கச் சந்தை நிலவரம்',
  'Gold and silver rates fluctuate daily according to market conditions. Quotations provided for custom designs are valid for 48 hours from issuance unless advance payment is deposited to lock the gold rate.': 'சந்தை நிலவரத்திற்கேற்ப தங்கம் மற்றும் வெள்ளி விலைகள் தினமும் மாறுபடும். முன்பணம் செலுத்தி தங்க விலையை உறுதி செய்யாவிட்டால், தனிப்பயன் வடிவமைப்புகளுக்கான விலைப்புள்ளிகள் வழங்கிய நேரத்திலிருந்து 48 மணி நேரம் செல்லுபடியாகும்.',
  '4. Returns & Maintenance Service': '4. திரும்பப் பெறுதல் மற்றும் பராமரிப்பு சேவை',
  'We offer lifetime complimentary cleaning and polish inspection for all Atelier Harx jewelry. Custom-made items are non-refundable but eligible for alteration or resizing if requested within 14 days.': 'Atelier Harx நகைகள் அனைத்திற்கும் வாழ்நாள் இலவச சுத்தம் மற்றும் மெருகூட்டல் பரிசோதனை வழங்குகிறோம். தனிப்பயன் நகைகளுக்குப் பணம் திருப்பி வழங்கப்படாது; 14 நாட்களுக்குள் கோரினால் மாற்றம் அல்லது அளவு சரிசெய்தல் செய்யலாம்.',
  'Search questions': 'கேள்விகளைத் தேடுங்கள்',
  '22K Royal Sovereign Gold Ring': '22K ராயல் பவுன் தங்க மோதிரம்',
  'Handcrafted 22K solid gold sovereign ring with intricate traditional filigree artwork and polished royal finish.': 'பாரம்பரிய நுணுக்க வேலைப்பாடுகளும் அரச கம்பீர மெருகூட்டலும் கொண்ட கையால் செய்யப்பட்ட 22K தங்க பவுன் மோதிரம்.',
  'Traditional Jaffna Gold Chain': 'பாரம்பரிய யாழ்ப்பாணத் தங்கச் சங்கிலி',
  'Authentic traditional handcrafted Jaffna style gold chain with durable interlocking links and premium hallmark polish.': 'உறுதியான இணைப்புகளும் தர முத்திரை மெருகூட்டலும் கொண்ட உண்மையான பாரம்பரிய யாழ்ப்பாணக் கையால் செய்யப்பட்ட தங்கச் சங்கிலி.',
  'Classic Jaffna heritage gold chain built with durable links and precision polish, suitable for daily wear and grand occasions.': 'தினசரி பயன்பாட்டிற்கும் சிறப்பு நிகழ்வுகளுக்கும் ஏற்ற, உறுதியான இணைப்புகள் மற்றும் துல்லியமான மெருகூட்டல் கொண்ட யாழ்ப்பாணப் பாரம்பரியத் தங்கச் சங்கிலி.',
  'Antique Gold Bridal Necklace': 'பழமையான வடிவத் தங்கத் திருமண நெக்லஸ்',
  'Exquisite bridal antique finish gold necklace featuring elaborate temple motifs and delicate gold drop hangings.': 'கோவில் வடிவ வேலைப்பாடுகளும் அழகிய தங்கத் தொங்கல்களும் கொண்ட பழமையான மெருகுடைய திருமணத் தங்க நெக்லஸ்.',
  'Masterpiece temple-style bridal necklace featuring detailed antique gold craft and certified Sri Lankan hallmark stamping.': 'பழமையான தங்க வேலைப்பாடுகளும் இலங்கை தர முத்திரைச் சான்றும் கொண்ட கோவில் பாணி திருமண நெக்லஸ்.',
  'Handcrafted Gold Bangles Pair': 'கையால் செய்யப்பட்ட தங்க வளையல்கள்',
  'Traditional 22K gold bangle pair with detailed handcrafted pattern, ruby gemstone accents, and polished royal finish.': 'நுணுக்கமான கைவினை வடிவம், மாணிக்கக் கல் அலங்காரம் மற்றும் அரச மெருகூட்டல் கொண்ட பாரம்பரிய 22K தங்க வளையல்கள்.',
  'Pair of solid 22K gold bangles engineered for strength, smooth comfort fit, and high-luster gloss finish.': 'உறுதி, அணிவதற்கான மென்மையான வசதி மற்றும் பளபளப்பான மெருகுடன் உருவாக்கப்பட்ட 22K தங்க வளையல்கள்.',
  'Royal Gold Bridal Necklace': 'ராயல் தங்கத் திருமண நெக்லஸ்',
  'Extraordinary royal bridal necklace handcrafted with 22K hallmarked gold and intricate traditional motifs.': '22K தர முத்திரைத் தங்கத்தால் நுணுக்கமான பாரம்பரிய வடிவங்களுடன் கையால் செய்யப்பட்ட சிறப்பான திருமண நெக்லஸ்.',
  'Solitaire Diamond Engagement Ring': 'ஒற்றைக் கல் வைர நிச்சயதார்த்த மோதிரம்',
  'Brilliant cut VVS1 clarity natural solitaire diamond set on custom 18K gold band.': 'தனிப்பயன் 18K தங்க மோதிரத்தில் பதிக்கப்பட்ட ஒளிரும் VVS1 இயற்கை ஒற்றை வைரம்.',
  'VVS Solitaire Diamond Ring': 'VVS ஒற்றைக் கல் வைர மோதிரம்',
  'Brilliant cut VVS1 clarity natural diamond set on custom 18K white gold band with international grading certificate.': 'சர்வதேச தரச் சான்றுடன் தனிப்பயன் 18K வெள்ளைத் தங்க மோதிரத்தில் பதிக்கப்பட்ட ஒளிரும் VVS1 இயற்கை வைரம்.',
  'Diamond Cluster Pendant Necklace': 'வைரக் கொத்து பதக்க நெக்லஸ்',
  'Bespoke diamond cluster dollar pendant crafted with precision stone setting for maximum sparkle and elegance.': 'அதிகபட்ச ஒளிர்வும் நேர்த்தியும் தரும் துல்லியமான கல் பதிப்புடன் செய்யப்பட்ட தனிப்பயன் வைரக் கொத்து பதக்கம்.',
  'Traditional Jaffna Bangle Set': 'பாரம்பரிய யாழ்ப்பாண வளையல் தொகுப்பு',
  'Handcrafted pair of 22K solid gold bangles with traditional braid artwork and ruby accents.': 'பாரம்பரிய பின்னல் வேலைப்பாடும் மாணிக்கக் கல் அலங்காரமும் கொண்ட கையால் செய்யப்பட்ட 22K தங்க வளையல்கள்.',
  'Authentic Jaffna heritage pattern gold bangles crafted with maximum durability and high-gloss polish.': 'உறுதியும் உயர் பளபளப்பு மெருகும் கொண்ட உண்மையான யாழ்ப்பாணப் பாரம்பரிய வடிவத் தங்க வளையல்கள்.',
  '925 Sterling Silver Bracelet': '925 ஸ்டெர்லிங் வெள்ளி காப்பு',
  'Heavy woven 925 sterling silver chain bracelet with secure toggle lock clasp.': 'பாதுகாப்பான பூட்டுடன் நெருக்கமாகப் பின்னப்பட்ட 925 ஸ்டெர்லிங் வெள்ளிச் சங்கிலிக் காப்பு.',
  'Handcrafted silver bracelet with anti-tarnish protective coating, made according to custom client measurement.': 'கருமை படியாத பாதுகாப்புப் பூச்சுடன் வாடிக்கையாளர் அளவிற்கேற்ப கையால் செய்யப்பட்ட வெள்ளிக் காப்பு.',
  'Heritage Temple Gold Chain': 'பாரம்பரிய கோவில் தங்கச் சங்கிலி',
  'Custom heavy link traditional chain with hand-cut polish detail for grand ceremonies.': 'சிறப்பு விழாக்களுக்கான கையால் மெருகூட்டிய இணைப்புகளுடன் உருவாக்கப்பட்ட பாரம்பரியத் தங்கச் சங்கிலி.',
  'Gold Diamond Loop Earrings': 'தங்க வைர வளையக் காதணிகள்',
  'Sleek gold diamond open loop earring.': 'நேர்த்தியான தங்க வைரத் திறந்த வளையக் காதணி.',
  'Grand Heritage Bridal Jewelry Set': 'பாரம்பரிய பிரம்மாண்ட திருமண நகைத் தொகுப்பு',
  'Complete luxury wedding collection set including grand choker, long haram, ear studs, and matching bangles.': 'பிரம்மாண்ட சோக்கர், நீளமான ஹாரம், காதணிகள் மற்றும் பொருத்தமான வளையல்கள் கொண்ட முழுமையான ஆடம்பரத் திருமண நகைத் தொகுப்பு.',
  'Premium anti-tarnish 925 sterling silver ring with rhodium protective coating and modern minimalist design.': 'ரோடியம் பாதுகாப்புப் பூச்சும் நவீன எளிய வடிவமைப்பும் கொண்ட கருமை படியாத உயர்தர 925 ஸ்டெர்லிங் வெள்ளி மோதிரம்.',
  'Royal Bridal Necklace Set': 'ராயல் திருமண நெக்லஸ் தொகுப்பு',
  'An extraordinary royal bridal necklace handcrafted with 22K hallmarked gold. Detailed with traditional Sri Lankan motifs and hand-set ruby gemstones.': '22K தர முத்திரைத் தங்கத்தால் கையால் செய்யப்பட்ட சிறப்பான திருமண நெக்லஸ். பாரம்பரிய இலங்கை வடிவங்களும் கையால் பதிக்கப்பட்ட மாணிக்கக் கற்களும் இதில் உள்ளன.',
  'Turn your dream ring, necklace, or bridal set into reality. Bring us a sketch, photo, or idea and we will custom forge it to exact weight & specifications.': 'உங்கள் கனவு மோதிரம், நெக்லஸ் அல்லது திருமண நகையை நனவாக்குங்கள். வரைபடம், புகைப்படம் அல்லது யோசனையைத் தாருங்கள்; துல்லியமான எடை மற்றும் விவரங்களுடன் உருவாக்குகிறோம்.',
  'Custom Bridal Sets & Engagement Rings': 'தனிப்பயன் திருமண நகைகள் மற்றும் நிச்சயதார்த்த மோதிரங்கள்',
  'Name Pendants & Family Crest Rings': 'பெயர் பதக்கங்கள் மற்றும் குடும்பச் சின்ன மோதிரங்கள்',
  'We provide precision manufacturing for boutique retailers, wedding parties, and corporate gifting with certified purity guarantees and competitive pricing.': 'சிறப்பு நகைக் கடைகள், திருமண நிகழ்வுகள் மற்றும் நிறுவனப் பரிசுகளுக்காகச் சான்றளிக்கப்பட்ட தூய்மை உத்தரவாதத்துடனும் போட்டி விலையிலும் துல்லியமான உற்பத்திச் சேவை வழங்குகிறோம்.',
  'Every piece crafted in our Chavakachcheri workshop uses 100% authentic 22K (916) Hallmark Gold, VVS natural diamonds, or pure 925 Sterling Silver.': 'எங்கள் சாவகச்சேரி பட்டறையில் உருவாக்கப்படும் ஒவ்வொரு நகையும் 100% உண்மையான 22K (916) தர முத்திரைத் தங்கம், VVS இயற்கை வைரங்கள் அல்லது தூய 925 ஸ்டெர்லிங் வெள்ளியால் தயாரிக்கப்படுகிறது.',
  'Consultation & Concept Design': 'ஆலோசனை மற்றும் வடிவமைப்புத் திட்டம்',
  'We discuss your custom design ideas, required gold weight, budget, and stone preferences via WhatsApp or in-person showroom visit.': 'WhatsApp மூலமாகவோ நகைக்கடைக்கு நேரில் வந்தோ உங்கள் வடிவமைப்பு யோசனை, தங்க எடை, பட்ஜெட் மற்றும் கல் விருப்பங்களைப் பற்றி பேசலாம்.',
  '3D CAD Modeling & Rendering': '3D CAD மாதிரி மற்றும் காட்சிப்படுத்தல்',
  'Our CAD specialists generate precision 3D digital models, allowing you to preview the exact jewelry piece before manufacturing begins.': 'உற்பத்தி தொடங்குவதற்கு முன் நகையைப் பார்க்கும் வகையில் எங்கள் CAD நிபுணர்கள் துல்லியமான 3D டிஜிட்டல் மாதிரிகளை உருவாக்குகிறார்கள்.',
  'Master Casting & Artisan Crafting': 'வார்ப்பு மற்றும் கைவினை உருவாக்கம்',
  'Using 100% certified 22K/18K Gold or 925 Silver, master goldsmiths in Chavakachcheri handcraft the intricate details and setting.': '100% சான்றளிக்கப்பட்ட 22K/18K தங்கம் அல்லது 925 வெள்ளியைக் கொண்டு சாவகச்சேரி பொற்கொல்லர்கள் நுணுக்கமான வேலைப்பாடுகளையும் கல் பதிப்பையும் கையால் செய்கிறார்கள்.',
  'Hallmark Quality & VIP Delivery': 'தர முத்திரை மற்றும் பாதுகாப்பான விநியோகம்',
  'Every completed masterpiece undergoes strict purity testing, hallmark certification, and secure insured delivery or store pickup.': 'முடிக்கப்பட்ட ஒவ்வொரு நகையும் தூய்மைச் சோதனை, தர முத்திரைச் சான்று மற்றும் காப்பீட்டுடன் பாதுகாப்பான விநியோகம் அல்லது கடையிலிருந்து பெற்றல் ஆகியவற்றைப் பெறுகிறது.',
  'Talk directly with our master jewelry consultants to get custom design estimates, weight suggestions, and manufacturing timelines.': 'தனிப்பயன் வடிவமைப்பு விலை, எடை ஆலோசனை மற்றும் தயாரிப்பு கால விவரங்களுக்கு எங்கள் நகை ஆலோசகர்களுடன் நேரடியாகப் பேசுங்கள்.',
  'Visit our showroom in Chavakachcheri or reach us via phone/WhatsApp.': 'சாவகச்சேரியில் உள்ள எங்கள் நகைக்கடைக்கு வருகை தாருங்கள் அல்லது தொலைபேசி / WhatsApp மூலம் தொடர்புகொள்ளுங்கள்.',
  'Describe your design preference, gold weight requirements, or question...': 'உங்கள் வடிவமைப்பு விருப்பம், தங்க எடைத் தேவை அல்லது கேள்வியை விவரிக்கவும்...',
};

const textRecords = new WeakMap();
const attributeRecords = new WeakMap();
const translatableAttributes = ['aria-label', 'placeholder', 'title', 'alt'];

function normalize(value) {
  return value.trim().replace(/\s+/g, ' ');
}

function localizedValue(value, language) {
  if (language !== 'ta') return value;
  return tamilTranslations[normalize(value)] ?? value;
}

function shouldSkipText(node) {
  return node.parentElement?.closest('script, style, textarea, [contenteditable="true"], [data-no-translate="true"]');
}

function translateTextNode(node, language) {
  if (shouldSkipText(node) || !node.nodeValue?.trim()) return;

  const currentValue = node.nodeValue;
  let record = textRecords.get(node);
  if (!record || record.rendered !== currentValue) {
    record = { source: currentValue, rendered: currentValue };
  }

  const leadingWhitespace = record.source.match(/^\s*/)?.[0] ?? '';
  const trailingWhitespace = record.source.match(/\s*$/)?.[0] ?? '';
  const translated = localizedValue(record.source.trim(), language);
  const nextValue = `${leadingWhitespace}${translated}${trailingWhitespace}`;
  record.rendered = nextValue;
  textRecords.set(node, record);

  if (currentValue !== nextValue) node.nodeValue = nextValue;
}

function translateAttribute(element, attribute, language) {
  if (element.closest('[data-no-translate="true"]')) return;

  const currentValue = element.getAttribute(attribute);
  if (!currentValue) return;

  let records = attributeRecords.get(element);
  if (!records) {
    records = new Map();
    attributeRecords.set(element, records);
  }

  let record = records.get(attribute);
  if (!record || record.rendered !== currentValue) {
    record = { source: currentValue, rendered: currentValue };
  }

  const nextValue = localizedValue(record.source, language);
  record.rendered = nextValue;
  records.set(attribute, record);
  if (currentValue !== nextValue) element.setAttribute(attribute, nextValue);
}

function translateElement(element, language) {
  translatableAttributes.forEach((attribute) => translateAttribute(element, attribute, language));

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    translateTextNode(node, language);
    node = walker.nextNode();
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => (
    localStorage.getItem('atelier-harx-language') === 'ta' ? 'ta' : 'en'
  ));

  useEffect(() => {
    localStorage.setItem('atelier-harx-language', language);
    document.documentElement.lang = language;

    const root = document.getElementById('root');
    if (!root) return undefined;

    translateElement(root, language);
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === 'characterData') {
          translateTextNode(record.target, language);
        } else if (record.type === 'attributes') {
          translateAttribute(record.target, record.attributeName, language);
        } else {
          record.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) translateElement(node, language);
            if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, language);
          });
        }
      });
    });

    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: translatableAttributes,
    });

    return () => observer.disconnect();
  }, [language]);

  const translate = (value) => localizedValue(value, language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

