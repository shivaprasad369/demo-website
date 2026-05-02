import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaSearch, FaTimes, FaThLarge, FaList, FaSlidersH } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { PRODUCT_CATEGORIES } from '../data/products';
import type { GetServerSideProps } from 'next';
import type { Product } from '../types/domain';

const PER_PAGE = 12;

interface ProductsPageProps {
  products: Product[];
}

export default function Products({ products }: ProductsPageProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const cat = getSingleQueryValue(router.query.cat);
    const q = getSingleQueryValue(router.query.q);
    if (cat) setCategory(decodeURIComponent(cat));
    if (q) setSearch(q);
  }, [router.query]);

  const filtered = products.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()) || p.desc?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const catCounts = PRODUCT_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === 'All' ? products.length : products.filter(p => p.category === cat).length;
    return acc;
  }, {});

  const handleCat = (cat: string) => { setCategory(cat); setPage(1); router.push({ pathname: '/products', query: cat !== 'All' ? { cat } : {} }, undefined, { shallow: true }); };
  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const clearFilters = () => { setSearch(''); setCategory('All'); setPage(1); router.push('/products', undefined, { shallow: true }); };

  return (
    <>
      <Head>
        <title>Products — Viraj Global Machinery | 62+ Commercial Kitchen Machines</title>
        <meta name="description" content="Browse 62+ commercial food processing machines — Roti Making, Dough Mixers, Pulverizers, Gravy Machines and more. ISO certified. Pan India delivery." />
      </Head>

      <style>{`
        .prod-hero { background:var(--navy); padding:44px 0 36px; }
        .prod-hero-inner { display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px; }
        .prod-hero-title { font-family:'Fraunces',serif; font-size:36px; font-weight:900; color:var(--white); margin-bottom:8px; }
        .prod-hero-title em { font-style:italic; color:var(--gold2); }
        .prod-hero-sub { font-size:14px; color:rgba(255,255,255,0.5); }
        .prod-hero-bc { display:flex; align-items:center; gap:6px; font-size:12px; color:rgba(255,255,255,0.4); margin-bottom:12px; }
        .prod-hero-bc a { color:rgba(255,255,255,0.5); text-decoration:none; }
        .prod-hero-bc a:hover { color:var(--gold3); }

        .prod-search-bar { background:var(--white); padding:20px 0; border-bottom:1px solid var(--cream3); position:sticky; top:70px; z-index:100; }
        .prod-search-inner { display:flex; gap:12px; align-items:center; }
        .prod-search-wrap { flex:1; position:relative; }
        .prod-search-wrap svg { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text3); }
        .prod-search-input { width:100%; border:1.5px solid var(--cream3); border-radius:9px; padding:11px 14px 11px 40px; font-size:14px; font-family:'Barlow',sans-serif; color:var(--text); background:var(--cream); outline:none; transition:border-color .2s; }
        .prod-search-input:focus { border-color:var(--gold); background:var(--white); }
        .prod-clear { background:none; border:1.5px solid var(--cream3); border-radius:8px; padding:10px 14px; font-size:13px; color:var(--text3); cursor:pointer; white-space:nowrap; transition:all .2s; display:flex; align-items:center; gap:6px; }
        .prod-clear:hover { border-color:var(--gold); color:var(--text); }
        .view-toggle { display:flex; border:1.5px solid var(--cream3); border-radius:8px; overflow:hidden; }
        .vt-btn { background:var(--white); border:none; padding:10px 12px; cursor:pointer; color:var(--text3); transition:all .2s; }
        .vt-btn.active { background:var(--navy); color:var(--gold2); }
        .mob-filter-btn { display:none; background:var(--navy); color:var(--white); border:none; border-radius:8px; padding:10px 14px; cursor:pointer; font-size:13px; font-weight:700; align-items:center; gap:6px; font-family:'Barlow Condensed',sans-serif; text-transform:uppercase; letter-spacing:.3px; }
        @media(max-width:768px) { .mob-filter-btn { display:flex; } }

        .prod-layout { display:grid; grid-template-columns:240px 1fr; gap:28px; padding:28px 0 60px; }
        .prod-sidebar { position:sticky; top:130px; height:fit-content; }
        .sidebar-section { background:var(--white); border:1.5px solid var(--cream3); border-radius:14px; padding:18px; margin-bottom:16px; }
        .sidebar-title { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:700; color:var(--text3); text-transform:uppercase; letter-spacing:1px; margin-bottom:14px; padding-bottom:8px; border-bottom:1px solid var(--cream3); }
        .cat-btn { display:flex; align-items:center; justify-content:space-between; width:100%; background:none; border:none; padding:8px 10px; border-radius:8px; cursor:pointer; font-family:'Barlow',sans-serif; font-size:13.5px; color:var(--text2); transition:all .2s; text-align:left; margin-bottom:3px; }
        .cat-btn:hover { background:var(--cream); color:var(--navy); }
        .cat-btn.active { background:var(--navy); color:var(--gold2); font-weight:700; }
        .cat-count { font-size:11px; background:var(--cream); border-radius:10px; padding:2px 8px; color:var(--text3); font-weight:600; }
        .cat-btn.active .cat-count { background:rgba(255,255,255,0.15); color:rgba(255,255,255,0.7); }

        .prod-main {}
        .prod-topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:10px; }
        .prod-count { font-size:14px; color:var(--text2); }
        .prod-count strong { color:var(--navy); font-weight:700; }
        .products-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:18px; }
        .products-list { display:flex; flex-direction:column; gap:14px; }

        .empty-state { text-align:center; padding:60px 20px; background:var(--cream); border-radius:16px; }
        .empty-state-icon { font-size:48px; margin-bottom:14px; }
        .empty-state-title { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:var(--navy); margin-bottom:8px; }
        .empty-state-sub { font-size:14px; color:var(--text2); margin-bottom:20px; }

        .pagination { display:flex; justify-content:center; gap:8px; margin-top:36px; align-items:center; }
        .page-btn { width:38px; height:38px; border-radius:8px; border:1.5px solid var(--cream3); background:var(--white); cursor:pointer; font-size:14px; font-weight:600; color:var(--text2); transition:all .2s; display:flex; align-items:center; justify-content:center; }
        .page-btn:hover { border-color:var(--gold); color:var(--navy); }
        .page-btn.active { background:var(--navy); border-color:var(--navy); color:var(--gold2); }
        .page-btn:disabled { opacity:.4; cursor:not-allowed; }

        .mob-sidebar-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:400; }
        .mob-sidebar-overlay.open { display:block; }
        .mob-sidebar-panel { position:fixed; left:0; top:0; bottom:0; width:280px; background:var(--white); z-index:401; padding:20px; overflow-y:auto; transform:translateX(-100%); transition:transform .25s; }
        .mob-sidebar-panel.open { transform:translateX(0); }
        .mob-sidebar-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
        .mob-sidebar-close { background:none; border:none; cursor:pointer; font-size:20px; color:var(--text2); }

        @media(max-width:900px) {
          .prod-layout { grid-template-columns:1fr; }
          .prod-sidebar { display:none; }
        }
        @media(max-width:600px) {
          .prod-search-inner { flex-wrap:wrap; }
          .view-toggle { display:none; }
        }
      `}</style>

      <div className="prod-hero">
        <div className="container">
          <div className="prod-hero-inner">
            <div>
              <div className="prod-hero-bc">
                <Link href="/">Home</Link> <span>/</span> <span>Products</span>
              </div>
              <h1 className="prod-hero-title">All <em>Products</em></h1>
              <div className="prod-hero-sub">{products.length}+ Commercial Food Processing Machines</div>
            </div>
          </div>
        </div>
      </div>

      <div className="prod-search-bar">
        <div className="container">
          <div className="prod-search-inner">
            <div className="prod-search-wrap">
              <FaSearch size={14}/>
              <input className="prod-search-input" type="text" placeholder="Search machines, categories..." value={search} onChange={e => handleSearch(e.target.value)}/>
            </div>
            {(search || category !== 'All') && <button className="prod-clear" onClick={clearFilters}><FaTimes size={11}/> Clear</button>}
            <div className="view-toggle">
              <button className={`vt-btn ${view==='grid'?'active':''}`} onClick={()=>setView('grid')} title="Grid View"><FaThLarge size={13}/></button>
              <button className={`vt-btn ${view==='list'?'active':''}`} onClick={()=>setView('list')} title="List View"><FaList size={13}/></button>
            </div>
            <button className="mob-filter-btn" onClick={()=>setFilterOpen(true)}><FaSlidersH size={13}/> Filter</button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`mob-sidebar-overlay ${filterOpen?'open':''}`} onClick={()=>setFilterOpen(false)}/>
      <div className={`mob-sidebar-panel ${filterOpen?'open':''}`}>
        <div className="mob-sidebar-header">
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16,textTransform:'uppercase',letterSpacing:'.5px'}}>Filter by Category</span>
          <button className="mob-sidebar-close" onClick={()=>setFilterOpen(false)}><FaTimes/></button>
        </div>
        {PRODUCT_CATEGORIES.map(cat => (
          <button key={cat} className={`cat-btn ${category===cat?'active':''}`} onClick={()=>{handleCat(cat);setFilterOpen(false);}}>
            {cat} <span className="cat-count">{catCounts[cat]}</span>
          </button>
        ))}
      </div>

      <div className="container">
        <div className="prod-layout">
          {/* Sidebar */}
          <aside className="prod-sidebar">
            <div className="sidebar-section">
              <div className="sidebar-title">Categories</div>
              {PRODUCT_CATEGORIES.map(cat => (
                <button key={cat} className={`cat-btn ${category===cat?'active':''}`} onClick={()=>handleCat(cat)}>
                  {cat} <span className="cat-count">{catCounts[cat]}</span>
                </button>
              ))}
            </div>
            <div className="sidebar-section">
              <div className="sidebar-title">Quick Contact</div>
              <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.7}}>
                <div style={{marginBottom:8}}>📞 <a href="tel:+918867099199" style={{color:'var(--gold)',fontWeight:600}}>+91 88670 99199</a></div>
                <div>💬 <a href="https://wa.me/918867099199" target="_blank" rel="noopener noreferrer" style={{color:'var(--green)',fontWeight:600}}>WhatsApp Us</a></div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="prod-main">
            <div className="prod-topbar">
              <div className="prod-count">
                Showing <strong>{filtered.length}</strong> {filtered.length===1?'product':'products'}
                {category!=='All' && <> in <strong>{category}</strong></>}
                {search && <> matching "<strong>{search}</strong>"</>}
              </div>
            </div>

            {paginated.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <div className="empty-state-title">No products found</div>
                <div className="empty-state-sub">Try a different search term or category</div>
                <button className="btn-gold" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className={view==='grid' ? 'products-grid' : 'products-list'}>
                {paginated.map(p => <ProductCard key={p.id} product={p} view={view}/>)}
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>←</button>
                {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                  <button key={n} className={`page-btn ${page===n?'active':''}`} onClick={()=>setPage(n)}>{n}</button>
                ))}
                <button className="page-btn" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>→</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async () => {
  const { getAllProducts } = await import('../lib/products');
  return { props: { products: getAllProducts() } };
};

function getSingleQueryValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] : value || '';
}
