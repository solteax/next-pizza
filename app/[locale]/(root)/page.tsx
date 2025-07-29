import {
  Container,
  Filters,
  Title,
  TopBar,
  ProductsGroupList,
  Stories,
} from '@/shared/components/blocks';
import { Suspense } from 'react';
import { GetSearchParams, findPizzas } from '@/shared/lib/find-pizzas';
import { getTranslations } from 'next-intl/server';
import { getVaLidTranslation } from '@/shared/lib';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);
  const t = await getTranslations()
  
  return (
    <>
      <Container className="mt-10">
        <Title text={t('allPizzasTitle')} size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Stories className='hidden sm:flex' />

      <Container className="mt-10 pb-14">
        <div className="flex flex-row gap-[80px]">
          <div className="w-[250px] mb-0 hidden sm:block">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Products list*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={getVaLidTranslation({key: category.translationKey && `category.${category.translationKey}`, defaultValue: category.name, t})}
                      categoryId={category.id}
                      categoryName={category.translationKey || category.name}
                      items={category.products}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
