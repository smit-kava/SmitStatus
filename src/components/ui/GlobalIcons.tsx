// ================================================
// GLOBAL ICONS — Single source of truth
// All icons used across the project live here.
// All icons are from @mui/icons-material.
// Usage:
//   import { RocketLaunch, MapIcon } from "@/components/ui/GlobalIcons"
//   <RocketLaunch IconColor="#ff5733" fontSize="large" />
// ================================================

import React from 'react';
import { alpha, useTheme } from '@mui/material';
import type { SvgIconProps } from '@mui/material';

// MUI icon imports
import RocketLaunchMui        from '@mui/icons-material/RocketLaunch';
import CodeMui                from '@mui/icons-material/Code';
import AutoAwesomeMui         from '@mui/icons-material/AutoAwesome';
import WidgetsMui             from '@mui/icons-material/Widgets';
import DataObjectMui          from '@mui/icons-material/DataObject';
import ApiMui                 from '@mui/icons-material/Api';
import StorageMui             from '@mui/icons-material/Storage';
import PaletteMui             from '@mui/icons-material/Palette';
import Inventory2Mui          from '@mui/icons-material/Inventory2';
import TimelineMui            from '@mui/icons-material/Timeline';
import SchoolMui              from '@mui/icons-material/School';
import GradeMui               from '@mui/icons-material/Grade';
import WorkMui                from '@mui/icons-material/Work';
import LayersMui              from '@mui/icons-material/Layers';
import StarMui                from '@mui/icons-material/Star';
import LocationOnMui          from '@mui/icons-material/LocationOn';
import LaptopMacMui           from '@mui/icons-material/LaptopMac';
import MenuBookMui            from '@mui/icons-material/MenuBook';
import EmojiEventsMui         from '@mui/icons-material/EmojiEvents';
import LocationCityMui        from '@mui/icons-material/LocationCity';
import StarsMui               from '@mui/icons-material/Stars';
import KeyboardDoubleArrowDownMui from '@mui/icons-material/KeyboardDoubleArrowDown';
import NotificationsActiveMui from '@mui/icons-material/NotificationsActive';
import WebMui                 from '@mui/icons-material/Web';
import DesktopWindowsMui      from '@mui/icons-material/DesktopWindows';
import PhoneAndroidMui        from '@mui/icons-material/PhoneAndroid';
import AndroidMui             from '@mui/icons-material/Android';
import MapMui                 from '@mui/icons-material/Map';
import MenuMui                from '@mui/icons-material/Menu';
import CloseMui               from '@mui/icons-material/Close';
import HomeMui                from '@mui/icons-material/Home';
import BuildMui               from '@mui/icons-material/Build';
import AccessTimeMui          from '@mui/icons-material/AccessTime';
import EmailMui               from '@mui/icons-material/Email';
import DescriptionMui         from '@mui/icons-material/Description';
import FolderOpenMui          from '@mui/icons-material/FolderOpen';
import ArrowForwardMui        from '@mui/icons-material/ArrowForward';
import CalendarTodayMui       from '@mui/icons-material/CalendarToday';
import OpenInNewMui           from '@mui/icons-material/OpenInNew';
import VisibilityMui          from '@mui/icons-material/Visibility';
import CheckMui               from '@mui/icons-material/Check';
import SendMui                from '@mui/icons-material/Send';
import BoltMui                from '@mui/icons-material/Bolt';
import TrackChangesMui        from '@mui/icons-material/TrackChanges';
import FavoriteMui            from '@mui/icons-material/Favorite';
import TerminalMui            from '@mui/icons-material/Terminal';
import DnsMui                 from '@mui/icons-material/Dns';
import MemoryMui              from '@mui/icons-material/Memory';
import DashboardMui           from '@mui/icons-material/Dashboard';
import AccountTreeMui         from '@mui/icons-material/AccountTree';
import LanguageMui            from '@mui/icons-material/Language';
import MonitorMui             from '@mui/icons-material/Monitor';
import SmartphoneMui          from '@mui/icons-material/Smartphone';
import ArrowBackMui           from '@mui/icons-material/ArrowBack';
import RadioMui               from '@mui/icons-material/Radio';
import BriefcaseMui           from '@mui/icons-material/BusinessCenter';
import SearchMui              from '@mui/icons-material/Search';

// ── Icon Props ───────────────────────────────────────────────────────────────
interface Props extends SvgIconProps {
  IconColor?: string;
}

// ── Factory: wraps any MUI icon to accept `IconColor` prop ──────────────────
const mkMui = (MuiIcon: React.ComponentType<SvgIconProps>) =>
  function Icon({ IconColor, ...p }: Props) {
    return <MuiIcon htmlColor={IconColor} {...p} />;
  };

// ── Named Exports ────────────────────────────────────────────────────────────
export const RocketLaunch             = mkMui(RocketLaunchMui);
export const Code                     = mkMui(CodeMui);
export const AutoAwesome              = mkMui(AutoAwesomeMui);
export const Widgets                  = mkMui(WidgetsMui);
export const DataObject               = mkMui(DataObjectMui);
export const Api                      = mkMui(ApiMui);
export const Storage                  = mkMui(StorageMui);
export const Palette                  = mkMui(PaletteMui);
export const Inventory2               = mkMui(Inventory2Mui);
export const Timeline                 = mkMui(TimelineMui);
export const School                   = mkMui(SchoolMui);
export const Grade                    = mkMui(GradeMui);
export const Work                     = mkMui(WorkMui);
export const MuiLayers                = mkMui(LayersMui);
export const Star                     = mkMui(StarMui);
export const LocationOn               = mkMui(LocationOnMui);
export const LaptopMac                = mkMui(LaptopMacMui);
export const MenuBook                 = mkMui(MenuBookMui);
export const EmojiEvents              = mkMui(EmojiEventsMui);
export const LocationCity             = mkMui(LocationCityMui);
export const Stars                    = mkMui(StarsMui);
export const KeyboardDoubleArrowDown  = mkMui(KeyboardDoubleArrowDownMui);
export const NotificationsActive      = mkMui(NotificationsActiveMui);
export const WebIcon                  = mkMui(WebMui);
export const DesktopIcon              = mkMui(DesktopWindowsMui);
export const MobileIcon               = mkMui(PhoneAndroidMui);
export const AndroidIcon              = mkMui(AndroidMui);
export const MapIcon                  = mkMui(MapMui);

// ── Lucide-equivalent MUI exports ───────────────────────────────────────────
export const Menu                     = mkMui(MenuMui);
export const X                        = mkMui(CloseMui);
export const Home                     = mkMui(HomeMui);
export const Wrench                   = mkMui(BuildMui);
export const Clock                    = mkMui(AccessTimeMui);
export const Mail                     = mkMui(EmailMui);
export const FileText                 = mkMui(DescriptionMui);
export const FolderOpen               = mkMui(FolderOpenMui);
export const ArrowRight               = mkMui(ArrowForwardMui);
export const Calendar                 = mkMui(CalendarTodayMui);
export const Layers                   = mkMui(LayersMui);
export const ExternalLink             = mkMui(OpenInNewMui);
export const Eye                      = mkMui(VisibilityMui);
export const GraduationCap            = mkMui(SchoolMui);
export const BookOpen                 = mkMui(MenuBookMui);
export const Check                    = mkMui(CheckMui);
export const Briefcase                = mkMui(BriefcaseMui);
export const LucideStar               = mkMui(StarMui);
export const MapPin                   = mkMui(LocationOnMui);
export const Send                     = mkMui(SendMui);
export const Zap                      = mkMui(BoltMui);
export const Target                   = mkMui(TrackChangesMui);
export const Heart                    = mkMui(FavoriteMui);
export const Rocket                   = mkMui(RocketLaunchMui);
export const Code2                    = mkMui(CodeMui);
export const Terminal                 = mkMui(TerminalMui);
export const Database                 = mkMui(StorageMui);
export const Server                   = mkMui(DnsMui);
export const Cpu                      = mkMui(MemoryMui);
export const Layout                   = mkMui(DashboardMui);
export const FileCode2                = mkMui(CodeMui);
export const GitBranch                = mkMui(AccountTreeMui);
export const Globe                    = mkMui(LanguageMui);
export const Monitor                  = mkMui(MonitorMui);
export const Smartphone               = mkMui(SmartphoneMui);
export const ArrowLeft                = mkMui(ArrowBackMui);
export const Radio                    = mkMui(RadioMui);
export const Search                   = mkMui(SearchMui);

// ── FA brand icons (no MUI equivalent — keep react-icons) ───────────────────
export { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

// ── FA utility icons → mapped to MUI ────────────────────────────────────────
export const FaFileAlt                = mkMui(DescriptionMui);
export const FaGlobe                  = mkMui(LanguageMui);
export const FaDesktop                = mkMui(DesktopWindowsMui);
export const FaMobileAlt              = mkMui(PhoneAndroidMui);
export const FaAndroid                = mkMui(AndroidMui);

// re-export alpha & useTheme for convenience
export { alpha, useTheme };
