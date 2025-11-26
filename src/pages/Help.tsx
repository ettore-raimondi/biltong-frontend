import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

export function Help() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Biltong Maker Help Guide</h1>
      <p className="text-gray-600 mb-6">
        Everything you need to know about making perfect biltong
      </p>

      {/* Section 1: What is Biltong */}
      <Card className="mb-6">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          What is Biltong?
        </h2>
        <p className="mb-4 leading-relaxed">
          Biltong is a traditional South African dried meat delicacy that dates
          back centuries. Unlike jerky, which is typically smoked and cooked,
          biltong is air-dried using a combination of vinegar, salt, and spices.
          The result is a tender, flavorful meat snack with a unique taste
          profile.
        </p>
        <p className="mb-4 leading-relaxed">
          The word "biltong" comes from the Dutch words "bil" (rump) and "tong"
          (strip or tongue). Originally developed as a way to preserve meat in
          the days before refrigeration, biltong has become a beloved snack
          enjoyed worldwide for its rich flavor, high protein content, and
          natural preservation.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <p className="font-semibold text-blue-900 mb-2">
            Key Characteristics:
          </p>
          <ul className="list-disc list-inside space-y-1 text-blue-800">
            <li>Air-dried, not smoked or cooked</li>
            <li>Made with vinegar, salt, and spices</li>
            <li>Tender texture with varying moisture levels</li>
            <li>High in protein, low in carbohydrates</li>
            <li>Natural preservation through dehydration</li>
          </ul>
        </div>
      </Card>

      {/* Section 2: Drying Profiles */}
      <Card className="mb-6">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Drying Profiles Explained
        </h2>
        <p className="mb-6 leading-relaxed">
          This app offers three carefully calibrated drying profiles to help you
          achieve your perfect biltong texture. Each profile controls
          temperature, humidity, airflow, and target weight loss to create
          different results.
        </p>

        {/* Wet Profile */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-2xl font-bold mb-3 text-blue-900">
            🌊 Wet Profile
          </h3>
          <p className="mb-3 leading-relaxed">
            <span className="font-semibold">Best for:</span> Those who prefer
            softer, more tender biltong with higher moisture content. Ideal for
            immediate consumption.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="font-semibold text-blue-800">Temperature:</p>
              <p>18-20°C (keeps interior soft)</p>
            </div>
            <div>
              <p className="font-semibold text-blue-800">Humidity:</p>
              <p>60-65% (higher moisture retention)</p>
            </div>
            <div>
              <p className="font-semibold text-blue-800">Airflow:</p>
              <p>0.1-0.2 m/s (gentle drying)</p>
            </div>
            <div>
              <p className="font-semibold text-blue-800">Weight Loss:</p>
              <p>20-25% (minimal dehydration)</p>
            </div>
          </div>
          <p className="text-sm italic text-blue-700 mb-2">
            Characteristics: Slow drying process; keeps interior soft;
            short-term shelf life
          </p>
          <div className="bg-yellow-50 p-3 rounded border-l-2 border-yellow-400">
            <p className="text-sm font-semibold text-yellow-800">⚠️ Note:</p>
            <p className="text-sm text-yellow-700">
              Wet biltong should be consumed within 1-2 weeks and refrigerated
              after a few days to prevent spoilage.
            </p>
          </div>
        </div>

        {/* Medium Profile */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-500">
          <h3 className="text-2xl font-bold mb-3 text-green-900">
            ⚖️ Medium Profile (Recommended)
          </h3>
          <p className="mb-3 leading-relaxed">
            <span className="font-semibold">Best for:</span> The classic biltong
            experience. Perfect balance between tenderness and preservation for
            traditional flavor and texture.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="font-semibold text-green-800">Temperature:</p>
              <p>20-22°C (balanced drying)</p>
            </div>
            <div>
              <p className="font-semibold text-green-800">Humidity:</p>
              <p>55-60% (optimal balance)</p>
            </div>
            <div>
              <p className="font-semibold text-green-800">Airflow:</p>
              <p>0.2-0.3 m/s (steady circulation)</p>
            </div>
            <div>
              <p className="font-semibold text-green-800">Weight Loss:</p>
              <p>35-40% (classic drying)</p>
            </div>
          </div>
          <p className="text-sm italic text-green-700 mb-2">
            Characteristics: Balanced drying; good texture; medium shelf life
          </p>
          <div className="bg-green-50 p-3 rounded border-l-2 border-green-400">
            <p className="text-sm font-semibold text-green-800">
              ✓ Ideal Choice:
            </p>
            <p className="text-sm text-green-700">
              This profile produces authentic biltong texture and can be stored
              at room temperature for 2-3 weeks, longer if refrigerated.
            </p>
          </div>
        </div>

        {/* Dry Profile */}
        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-l-4 border-orange-500">
          <h3 className="text-2xl font-bold mb-3 text-orange-900">
            🔥 Dry Profile
          </h3>
          <p className="mb-3 leading-relaxed">
            <span className="font-semibold">Best for:</span> Long-term storage
            and those who prefer firmer, more traditional dried meat texture.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="font-semibold text-orange-800">Temperature:</p>
              <p>22-24°C (faster drying)</p>
            </div>
            <div>
              <p className="font-semibold text-orange-800">Humidity:</p>
              <p>45-55% (lower moisture)</p>
            </div>
            <div>
              <p className="font-semibold text-orange-800">Airflow:</p>
              <p>0.3-0.5 m/s (strong circulation)</p>
            </div>
            <div>
              <p className="font-semibold text-orange-800">Weight Loss:</p>
              <p>50-60% (maximum dehydration)</p>
            </div>
          </div>
          <p className="text-sm italic text-orange-700 mb-2">
            Characteristics: Fast drying; firm texture; extended shelf life
          </p>
          <div className="bg-orange-50 p-3 rounded border-l-2 border-orange-400">
            <p className="text-sm font-semibold text-orange-800">📦 Storage:</p>
            <p className="text-sm text-orange-700">
              Dry biltong can be stored at room temperature for several weeks or
              months, making it perfect for long-term storage and travel.
            </p>
          </div>
        </div>
      </Card>

      {/* Section 3: The Drying Process */}
      <Card className="mb-6">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          The Drying Process
        </h2>
        <p className="mb-6 leading-relaxed">
          Understanding the drying process helps you achieve consistent, safe,
          and delicious results every time.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg mb-2">Preparation & Marination</h4>
            <p className="leading-relaxed">
              Before drying begins, meat is cut into strips, marinated with
              vinegar (for preservation and flavor), then coated with salt and
              spices. The marination process typically takes 12-24 hours,
              allowing the flavors to penetrate and the vinegar to begin the
              preservation process.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-2">
              Initial Drying Phase (Days 1-2)
            </h4>
            <p className="leading-relaxed">
              The meat is hung in a controlled environment where air circulation
              begins removing surface moisture. During this phase, you'll notice
              the exterior developing a darker color and forming a slight crust.
              This crust helps protect the interior while allowing continued
              moisture release.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-2">
              Progressive Dehydration (Days 3-5)
            </h4>
            <p className="leading-relaxed">
              As drying continues, moisture gradually moves from the interior to
              the surface where it evaporates. The meat becomes firmer, weight
              decreases steadily, and flavors concentrate. Temperature,
              humidity, and airflow work together to ensure even drying without
              case hardening (exterior drying too fast, trapping moisture
              inside).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-2">
              Final Drying & Equilibration (Days 5-7+)
            </h4>
            <p className="leading-relaxed">
              In the final stages, drying slows as the meat reaches its target
              weight loss. The moisture content equalizes throughout the piece,
              and the texture becomes consistent. Drying time varies based on
              thickness, profile chosen, and desired final texture. This app
              monitors weight loss and will alert you when your target is
              reached.
            </p>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mt-6">
          <h4 className="font-bold text-purple-900 mb-2">
            🔬 The Science Behind It
          </h4>
          <p className="text-purple-800 leading-relaxed">
            Meat naturally contains about 75% water. By removing 35-60% of the
            total weight (mostly water), we reduce the water activity (aw) below
            levels that support bacterial growth, while salt and vinegar provide
            additional antimicrobial protection. The controlled airflow prevents
            stagnant air pockets where mold could develop, while maintaining
            appropriate humidity prevents over-drying of the exterior.
          </p>
        </div>
      </Card>

      {/* Section 4: Tips and Tricks */}
      <Card className="mb-6">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Tips & Tricks for Perfect Biltong
        </h2>
        <p className="mb-6 leading-relaxed">
          Master the art of biltong making with these expert tips and common
          pitfalls to avoid.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Best Practices */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-lg mb-3 text-green-900 flex items-center gap-2">
              ✅ Best Practices
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>
                  <strong>Choose the right cut:</strong> Silverside, topside, or
                  rump work best. Look for lean cuts with minimal fat.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>
                  <strong>Consistent thickness:</strong> Cut strips to uniform
                  thickness (1-2cm) for even drying.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>
                  <strong>Remove excess fat:</strong> Trim visible fat as it can
                  become rancid during drying.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>
                  <strong>Pat dry after marinating:</strong> Remove excess
                  moisture before hanging to prevent dripping.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>
                  <strong>Space pieces properly:</strong> Ensure airflow around
                  all sides by leaving gaps between pieces.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>
                  <strong>Check daily:</strong> Inspect for any signs of mold or
                  uneven drying, especially in the first few days.
                </span>
              </li>
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-bold text-lg mb-3 text-red-900 flex items-center gap-2">
              ⚠️ Common Mistakes to Avoid
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  <strong>Too humid:</strong> Can lead to mold growth. Keep
                  humidity in recommended ranges.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  <strong>Too dry:</strong> Creates a hard crust that traps
                  moisture inside (case hardening).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  <strong>Insufficient airflow:</strong> Results in stagnant air
                  pockets and uneven drying.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  <strong>Rushing the process:</strong> High temperatures may
                  seem faster but can cook rather than dry the meat.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  <strong>Overcrowding:</strong> Pieces touching or too close
                  together prevent proper air circulation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  <strong>Ignoring fat content:</strong> Fatty pieces can
                  develop off flavors and spoil faster.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-4">
          <h3 className="font-bold text-lg mb-3 text-indigo-900 flex items-center gap-2">
            💡 Pro Tips
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>
                <strong>Texture Testing:</strong> To test if biltong is ready,
                press it firmly. Wet biltong yields easily, medium biltong has
                some give but springs back, and dry biltong feels firm
                throughout.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>
                <strong>Flavor Enhancement:</strong> Experiment with spices like
                coriander, black pepper, chili flakes, or garlic powder.
                Traditional biltong uses coarsely ground coriander as the
                primary spice.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>
                <strong>Storage Optimization:</strong> Store finished biltong in
                paper bags (not plastic) to allow any remaining moisture to
                escape. For longer storage, vacuum seal and refrigerate or
                freeze.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>
                <strong>Dealing with White Spots:</strong> Small white spots
                (salt crystals) are normal. White/green fuzzy growth is mold and
                the piece should be discarded. Good airflow prevents mold.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>
                <strong>Monitoring Progress:</strong> Use this app to track
                weight loss accurately. The target weight loss percentages in
                each profile are calibrated for optimal results based on
                traditional biltong making practices.
              </span>
            </li>
          </ul>
        </div>

        {/* Safety Reminder */}
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          <h4 className="font-bold text-yellow-900 mb-2">🛡️ Safety Reminder</h4>
          <p className="text-yellow-800 text-sm leading-relaxed">
            Always practice good hygiene when handling raw meat. Use clean
            equipment, wash hands thoroughly, and ensure your drying environment
            is clean. While properly made biltong is safe due to the
            preservation process, always inspect your biltong before consuming
            and discard any pieces that show signs of spoilage or mold.
          </p>
        </div>
      </Card>

      <Divider />

      {/* Footer note */}
      <div className="text-center text-gray-600 text-sm mt-6 mb-4">
        <p>
          Happy biltong making! Experiment with different profiles and spice
          combinations to find your perfect recipe.
        </p>
      </div>
    </div>
  );
}
