import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, setIsOpen }) {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    {
      id: 'home',
      title: '홈',
      icon: '🏠',
      to: '/',
      submenu: [
        { title: '할 일', path: '/home/todo' },
        { title: '통합 대시보드', path: '/home/dashboard' },
        { title: '사업장 대시보드', path: '/home/workplace-dashboard' },
        { title: '업무관리', path: '/home/task-management' },
        { title: '캘린더', path: '/home/calendar' },
        { title: '안전보건경영체계', path: '/home/safety-management' },
        { title: '반기점검', path: '/home/semi-annual-check' },
        { title: '안전보건교육', path: '/home/safety-education' },
        { title: 'TBM', path: '/home/tbm' },
        { title: '위험성평가', path: '/home/risk-assessment' },
        { title: '안전점검', path: '/home/safety-inspection' },
        { title: '위원회', path: '/home/committee' },
        { title: '신고/제안', path: '/home/report-suggestion' },
        { title: '보호구 관리', path: '/home/ppe-management' },
        { title: '보호구 지급', path: '/home/ppe-distribution' },
        { title: '보호구 신청', path: '/home/ppe-request' },
        { title: '위험작업', path: '/home/hazardous-work' },
        { title: '산업재해 조사', path: '/home/accident-investigation' },
        { title: '기계/기구', path: '/home/machinery' }
      ]
    },
    {
      id: 'contract',
      title: '도급관리',
      icon: '📋',
      submenu: [
        { title: '수급업체 관리', path: '/contract/subcontractor' },
        { title: '안전보건수준평가', path: '/contract/safety-evaluation' },
        { title: '도급 안전점검', path: '/contract/safety-inspection' }
      ]
    },
    {
      id: 'health',
      title: '보건관리',
      icon: '🏥',
      submenu: [
        { title: '화학물질 관리', path: '/health/chemical' },
        { title: '건강진단 관리', path: '/health/health-group' },
        { title: '작업환경측정', path: '/health/work-environment' },
        { title: '직무스트레스 관리', path: '/health/job-stress' },
        { title: '근골격계 유해요인 조사', path: '/health/musculoskeletal-hazard' },
        { title: '근골격계 증상 조사', path: '/health/musculoskeletal-symptom' }
      ]
    },
    {
      id: 'ai',
      title: 'AI 분석',
      icon: '🤖',
      submenu: [
        { title: '위험요인 파악 및 개선', path: '/ai/risk-factors' },
        { title: 'AI 위험성평가', path: '/ai/risk-assessment' }
      ]
    },
    {
      id: 'admin',
      title: '관리자',
      icon: '⚙️',
      submenu: [
        { title: '사업장 관리', path: '/admin/workplace' },
        { title: '계정 관리자 변경', path: '/admin/account-manager' }
      ]
    }
  ];

  const bottomMenuItems = [
    { title: '설정', icon: '⚙️', path: '/settings' },
    { title: '개인프로필', icon: '👤', path: '/profile' },
    { title: '결재함', icon: '📝', path: '/approval' },
    { title: '이용가이드', icon: '📚', path: '/guide' },
    { title: '로그아웃', icon: '🚪', path: '/logout' }
  ];

  const toggleSubmenu = (menuId) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };

  return (
    <div className={`bg-blue-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col h-full`}>
      {/* 로고 */}
      <div className="flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">안전보건관리</span>
      </div>

      {/* 메인 메뉴 */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.to ? (
              <Link
                to={item.to}
                className="w-full flex items-center space-x-2 px-4 py-2.5 hover:bg-blue-700 rounded transition duration-200"
                onClick={() => toggleSubmenu(item.id)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.title}</span>
                <span className="ml-auto">{expandedMenu === item.id ? '▼' : '▶'}</span>
              </Link>
            ) : (
              <button
                onClick={() => toggleSubmenu(item.id)}
                className="w-full flex items-center space-x-2 px-4 py-2.5 hover:bg-blue-700 rounded transition duration-200"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.title}</span>
                <span className="ml-auto">{expandedMenu === item.id ? '▼' : '▶'}</span>
              </button>
            )}
            {expandedMenu === item.id && (
              <div className="pl-12 py-2 space-y-1">
                {item.submenu.map((subItem, index) => (
                  <Link
                    key={index}
                    to={subItem.path}
                    className="block py-2 px-4 hover:bg-blue-700 rounded transition duration-200"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* 하단 메뉴 */}
      <div className="border-t border-blue-700 pt-4">
        {bottomMenuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center space-x-2 px-4 py-2.5 hover:bg-blue-700 rounded transition duration-200"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar; 