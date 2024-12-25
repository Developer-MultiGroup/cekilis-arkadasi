"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <CustomHeader>DMG ÇEKİLİŞ ARKADAŞIN</CustomHeader>

        <div className="flex justify-center mb-8">
          <Button
            onClick={() => router.push("/login")}
            className="text-white px-8 py-2 rounded-lg"
          >
            Giriş Yap
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Nasıl Çalışır?</CardTitle>
          </CardHeader>
          <CardContent className="prose">
            <p>
              Oluşturduğumuz sistem yılbaşı çekilişine kendi bakış açımızı
              getirmek amacıyla kuruldu. Yeni bir yıla girerken ekip
              üyelerimizin eşleştirilmesi ve birbirlerine alacakları sürpriz
              hediyelerle tanışmasına dayanıyor.
            </p>

            <p className="pt-4">
              İlk olarak yapmanız gereken ilk şey üyelik oluşturmanız ve de
              adres bilgileriniz ile bu adımı sağlarken eğlenceli olduğunu
              düşündüğünüz fotoğrafınızı yüklemeyi unutmayın . Eğer çok ciddi
              bir fotoğraf koyarsanız adminlerimiz fotoğrafı değiştirme hakkına
              sahiptir.
            </p>

            <h3 className="font-semibold mt-6 mb-4">Adımlar:</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                <h4 className="font-medium text-orange-600">
                  1. Adım - 26 Aralık, 21:00
                </h4>
                <p>Çark sistemi ile hediye alınacak kişinin belirlenmesi</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <h4 className="font-medium text-orange-600">
                  2. Adım - 27 Aralık, 21:00
                </h4>
                <p>Hediyelerin sisteme yüklenmesi</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <h4 className="font-medium text-orange-600">
                  3. Adım - 1 Ocak, 00:00
                </h4>
                <p>Hediye tahmin oyunu ve puan tablosu</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Kurallar</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-3">
              <li>
                Çekilişe sadece bir kez ve belirtilen tarihlerde
                katılabilirsiniz.
              </li>
              <li>
                Fotoğraf değişimleri ve de katılımcıların eşleşmeler hakkındaki
                itirazları dikkate alınmayacaktır.Kime hediye aldığınız sizler
                ile birlikte{" "}
                <b className="text-orange-600">kesinlikle saklanmalıdır</b>.
              </li>
              <li>
                Her bir adım tamamlandığında sizlere gerekli bilgilendirme
                sağlanacaktır. Sizlerden ricamız{" "}
                <b className="text-orange-600">iletilen sürelerde</b> gerekli
                adımları tamamlamanızdır.
              </li>
              <li>
                Yaratıcılığını konuşturmanız ve kendinizi en iyi şekilde ifade
                etmeniz için hediye alımında üst sınırını{" "}
                <b className="text-orange-600">300 ₺</b> olarak belirledik.
                Hediye seçiminde buna özen göstermenizi ,kendi hayal gücünüzü
                konuşturarak hediye aldığınız kişide ve diğer ekip üyelerinde
                bir tutam gülümseme yaratmaya çalışmanızı rica ediyoruz.
              </li>
              <li>
                Hediyelerin gönderiminin{" "}
                <b className="text-orange-600">1 Ocak</b> tarihinden sonra yapılacağını
                lütfen unutmamanızı ve de eğlencenin tadını çıkarmanızı isteriz.
                DMG olarak bu yıl çok daha güzel geçecek
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
