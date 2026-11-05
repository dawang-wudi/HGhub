import { useStore, type Tab } from "../store";
import { APP_VERSION } from "../api";
import { Avatar } from "./ui";
import {
  IChevR, IClose, IGrid, IGridF, IHome, IHomeF, ISearch, ISettings, ITrophy, IUser, IUserF, Logo,
} from "../icons";

/* 移动端左侧抽屉导航（抖音式）：首页左上角三条杠点开、点遮罩或选中菜单即收起。
   只挂在 MobileShell 里，桌面端不会渲染。 */
export default function MobileDrawer() {
  const { navOpen, setNavOpen, tab, setTab, push, user, setLoginOpen, plat } = useStore();
  if (!navOpen) return null;

  const close = () => setNavOpen(false);
  const go = (k: Tab) => { setTab(k); close(); };

  const items: { key: Tab; label: string; Icon: typeof IHome; Filled: typeof IHomeF }[] = [
    { key: "home", label: "首页", Icon: IHome, Filled: IHomeF },
    { key: "search", label: "搜索", Icon: ISearch, Filled: ISearch },
    { key: "category", label: "分类", Icon: IGrid, Filled: IGridF },
    { key: "profile", label: "我的", Icon: IUser, Filled: IUserF },
  ];

  return (
    <>
      {/* 遮罩：点一下（包括点视频区域）就收起 */}
      <div className="mdrawer-backdrop" onClick={close} />

      <aside className="mdrawer hg-player-ui" role="dialog" aria-modal="true" aria-label="主导航">
        <div className="flex items-center gap-2 px-4 pb-3">
          <Logo size={26} />
          <span className="text-[17px] font-bold text-on">HG<span className="text-primary">hub</span></span>
          <button onClick={close} aria-label="关闭菜单"
            className="ml-auto w-9 h-9 rounded-full flex items-center justify-center text-mut pressable">
            <IClose size={18} />
          </button>
        </div>

        <button onClick={() => go("search")}
          className="mx-3 mb-2 h-10 shrink-0 rounded-full bg-s3 flex items-center gap-2 px-4 text-[13px] text-mut pressable">
          <ISearch size={17} />
          <span>搜索你感兴趣的</span>
        </button>

        <nav className="flex flex-col gap-1 px-2">
          {items.map(({ key, label, Icon, Filled }) => (
            <button key={key} onClick={() => go(key)}
              className={`h-11 shrink-0 rounded-(--r-md) flex items-center gap-3 px-3 pressable ${tab === key ? "bg-s3 text-on" : "text-mut"}`}>
              {tab === key ? <Filled size={20} /> : <Icon size={20} strokeWidth={1.7} />}
              <span className="text-[14.5px]">{label}</span>
            </button>
          ))}
          <button onClick={() => { push({ kind: "ranks" }); close(); }}
            className="h-11 shrink-0 rounded-(--r-md) flex items-center gap-3 px-3 text-mut pressable">
            <ITrophy size={20} strokeWidth={1.7} />
            <span className="text-[14.5px]">排行榜</span>
          </button>
          <button onClick={() => { push({ kind: "settings" }); close(); }}
            className="h-11 shrink-0 rounded-(--r-md) flex items-center gap-3 px-3 text-mut pressable">
            <ISettings size={20} strokeWidth={1.7} />
            <span className="text-[14.5px]">设置</span>
          </button>
        </nav>

        <div className="mt-auto px-3" style={{ paddingBottom: "calc(var(--sab, 0px) + 14px)" }}>
          <button onClick={() => { close(); setTab("profile"); if (!user) setLoginOpen(true); }}
            className="w-full flex items-center gap-2.5 p-2 rounded-(--r-md) pressable">
            <Avatar size={34} hue={220} name={user?.nickname} icon={user ? undefined : <IUser size={17} />} />
            <span className="flex-1 min-w-0 text-left">
              <strong className="block text-[13.5px] text-on truncate">{user?.nickname || "登录 HGhub"}</strong>
              <small className="block text-[11px] text-dim truncate">{user ? "你的精彩，都在这里" : "留住每一次心动"}</small>
            </span>
            <IChevR size={15} className="text-dim" />
          </button>
          <div className="text-[10px] text-dim px-2 pt-1">
            HGhub {APP_VERSION} · {plat === "android" ? "Android" : "iOS"} 客户端
          </div>
        </div>
      </aside>
    </>
  );
}
