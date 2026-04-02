export const vi = {
  chat: {
    session: {
      main: "main",
      workspace: "workspace",
      review: "review"
    },
    tools: {
      title: "Công cụ",
      description: "Xem nhanh các công cụ cục bộ đang khả dụng cho lượt chat hiện tại.",
      enabled: "Đã bật",
      blocked: "Bị chặn",
      result: "Kết quả",
      readCategory: "Đọc",
      execCategory: "Thực thi",
      completed: "Hoàn tất",
      running: "Đang chạy",
      execLabel: "exec",
      readLabel: "read",
      empty: "Hoạt động công cụ sẽ xuất hiện ở đây trong lúc chat chạy.",
      execSummary: "1 tool exec",
      readSummary: "1 tool read",
      execDetail: "với lệnh liệt kê file trong skills, `ls skills`",
      readDetail: "đọc từ skills/trello/SKILL.md",
      envDetail:
        "với if [ -n \"$TRELLO_API_KEY\" ] && [ -n \"$TRELLO_TOKEN\" ]; then echo ready; else echo missing; fi"
    },
    mock: {
      userPrompt: "Liệt kê tất cả board Trello của tôi",
      userLabel: "Bạn",
      assistantName: "Assistant",
      assistantBody: {
        first:
          "Để liệt kê các board Trello, Ducky vẫn cần API key và token hợp lệ cho skill Trello.",
        second:
          "Hiện tại các biến môi trường đó còn thiếu, nên tool đã dừng trước khi kịp gọi API.",
        third:
          "Bạn có thể thêm thông tin đăng nhập trong phần cấu hình, hoặc trỏ mình tới file config đã lưu để mình tiếp tục."
      },
      assistantMeta: {
        time: "9:08 AM",
        usage: "10.4k ↓611 R212.9k",
        model: "gpt-5.1-codex"
      }
    },
    composer: {
      placeholder: "Nhắn cho Assistant (Enter để gửi)",
      helper: "Tệp và nhập giọng nói sẽ được nối vào đây tiếp theo.",
      send: "Gửi",
      sending: "Đang gửi..."
    },
    states: {
      loading: "Đang tải phiên chat...",
      empty: "Phiên này chưa có tin nhắn nào. Hãy gửi tin đầu tiên để bắt đầu chạy cục bộ.",
      streaming: "Đang stream phản hồi..."
    },
    errors: {
      load: "Chưa tải được phiên chat này.",
      tools: "Chưa tải được danh mục công cụ lúc này.",
      send: "Chưa gửi được tin nhắn này."
    }
  },
  onboarding: {
    badge: "Thiết lập lần đầu",
    title: "Kết nối một provider và chọn model mặc định cho Ducky",
    description:
      "Flow này đi theo tinh thần wizard gọn của OpenClaw, nhưng giữ mọi thứ cục bộ ngay trong app desktop.",
    loading: "Đang chuẩn bị thiết lập lần đầu...",
    providerHelper: "Lưu hoặc test provider tại đây, rồi chọn model mặc định mà Ducky sẽ dùng.",
    optionalKey: "Provider này có thể dùng mà không cần lưu API key, nên bạn có thể đi thẳng tới bước chọn model.",
    modelPlaceholder: "Chọn model",
    steps: {
      step1: {
        label: "Bước 1",
        body: "Chọn provider mà bạn muốn Ducky dùng trước."
      },
      step2: {
        label: "Bước 2",
        body: "Lưu và test API key để chắc runtime đã sẵn sàng thật."
      },
      step3: {
        label: "Bước 3",
        body: "Chọn model mặc định và hoàn tất setup để mở khóa màn chat."
      }
    },
    runtime: {
      title: "Trạng thái runtime",
      description: "Ducky kiểm tra cùng một trạng thái provider và model mà màn chat sử dụng.",
      providers: "Provider sẵn sàng",
      models: "Model sẵn sàng",
      current: "Trạng thái thiết lập hiện tại",
      readyState: "Setup này đã hoàn tất. Ducky có thể mở màn chat với model mặc định có provider thật.",
      pendingState: "Hãy hoàn tất một lựa chọn model có provider thật trước khi màn chat trở thành điểm vào mặc định."
    },
    actions: {
      finish: "Hoàn tất thiết lập",
      openConfig: "Mở cấu hình đầy đủ"
    },
    errors: {
      load: "Chưa tải được thiết lập lần đầu.",
      save: "Chưa lưu được bước thiết lập này.",
      test: "Chưa test được provider này.",
      defaultModel: "Hãy chọn provider và model trước khi hoàn tất thiết lập."
    }
  },
  sessions: {
    title: "Phiên chat",
    description: "Xem lại, đổi tên, lưu trữ và mở lại lịch sử hội thoại cục bộ.",
    detailDescription: "Sắp xếp phiên tại đây rồi quay lại chat khi bạn muốn tiếp tục.",
    createPlaceholder: "Tên phiên mới",
    previewFallback: "Phiên này chưa có tin nhắn nào.",
    current: "Hiện tại",
    messages: "tin nhắn",
    noSelection: "Chọn một phiên",
    noSelectionDescription: "Chọn một phiên ở danh sách bên trái để xem transcript và thao tác.",
    userLabel: "Bạn",
    assistantLabel: "Assistant",
    tabs: {
      active: "Đang hoạt động",
      archived: "Đã lưu trữ"
    },
    actions: {
      create: "Tạo phiên",
      creating: "Đang tạo...",
      openChat: "Mở trong chat",
      archive: "Lưu trữ",
      restore: "Khôi phục",
      rename: "Đổi tên",
      saving: "Đang lưu...",
      saved: "Đã lưu"
    },
    states: {
      loading: "Đang tải các phiên...",
      empty: "Chưa có phiên hoạt động nào.",
      emptyArchived: "Chưa có phiên lưu trữ nào.",
      emptyMessages: "Phiên này chưa có tin nhắn nào."
    },
    errors: {
      load: "Chưa tải được danh sách phiên.",
      detail: "Chưa tải được transcript của phiên này.",
      create: "Chưa tạo được phiên mới.",
      rename: "Chưa đổi tên được phiên này.",
      archive: "Chưa cập nhật được trạng thái lưu trữ của phiên này.",
      delete: "Chưa xóa được phiên này."
    }
  },
  providers: {
    title: "API key nhà cung cấp",
    description: "Kết nối các nhà cung cấp model chính thống mà Ducky sẽ dùng.",
    summary: "provider đã sẵn sàng",
    status: {
      ready: "Sẵn sàng",
      missing: "Thiếu API key",
      optional: "Key tùy chọn"
    },
    actions: {
      add: "Thêm provider",
      save: "Lưu key",
      test: "Kiểm tra kết nối",
      testing: "Đang kiểm tra...",
      saving: "Đang lưu...",
      saved: "Đã lưu"
    },
    form: {
      helper: "Nhập API key cho provider này và lưu cục bộ.",
      saved: "API key đã được lưu cục bộ"
    },
    errors: {
      load: "Chưa tải được danh sách provider.",
      save: "Chưa lưu được API key này.",
      test: "Chưa kiểm tra được provider này."
    },
    custom: {
      title: "Thêm provider",
      description: "Tạo provider riêng với base URL và API key của bạn.",
      fields: {
        name: "Tên provider",
        baseUrl: "Base URL",
        apiKey: "API key"
      },
      actions: {
        cancel: "Hủy",
        create: "Tạo provider",
        creating: "Đang tạo..."
      },
      errors: {
        required: "Cần nhập tên provider và base URL.",
        create: "Chưa tạo được provider này."
      }
    },
    runtime: {
      title: "Chat runtime",
      description: "Chọn model mặc định có provider thật cho các lượt chat mới.",
      defaultModel: "Model mặc định",
      save: "Lưu mặc định",
      saving: "Đang lưu...",
      saved: "Đã lưu",
      ready: "model đã sẵn sàng",
      current: "Mặc định hiện tại",
      helper: "Toolbar chat sẽ khôi phục lựa chọn này khi app được mở lại."
    }
  },
  shell: {
    search: "Tìm trong workspace",
    workspace: "Không gian làm việc",
    projectName: "Ducky desktop",
    menu: "Ẩn hiện thanh bên",
    hero: {
      title: "Khung desktop gọn hơn cho Ducky",
      summary:
        "Layout giờ tập trung vào cấu trúc tái sử dụng thay vì code demo, với header thật, sidebar có thể thu gọn, chọn ngôn ngữ, chọn theme, dropdown menu và modal nền."
    },
    actions: {
      newTask: "Tạo task",
      runCheck: "Chạy kiểm tra"
    },
    sections: {
      chat: "Chat",
      control: "Control",
      agent: "Agent",
      settings: "Settings"
    },
    nav: {
      chat: "Chat",
      overview: "Overview",
      channels: "Channels",
      instances: "Instances",
      sessions: "Sessions",
      usage: "Usage",
      cronJobs: "Cron jobs",
      agents: "Agents",
      skills: "Skills",
      nodes: "Nodes",
      config: "Config",
      communications: "Communications",
      docs: "Docs"
    },
    panel: {
      title: "Khung dự án",
      description:
        "Header và sidebar giờ tạo ra cấu trúc chính của app desktop, còn vùng nội dung tập trung vào các khối sản phẩm có thể tái sử dụng.",
      stats: {
        ready: "Sẵn cho app shell",
        i18n: "i18n đã nối",
        theme: "Theme tokens đã bật"
      }
    },
    cards: {
      layout: {
        title: "Layout primitives",
        body:
          "Header, sidebar và content giờ đã được tách thành shell components có thể tái sử dụng thay vì dồn vào một file demo lớn."
      },
      language: {
        title: "Chọn ngôn ngữ",
        body:
          "Ngôn ngữ có thể đổi từ sidebar hoặc dropdown trên header, và lựa chọn được lưu cục bộ."
      },
      theme: {
        title: "Chọn theme",
        body:
          "Light, dark và system mode giờ dùng chung semantic tokens và có thể đổi ngay trên header."
      }
    }
  },
  modal: {
    newTask: {
      title: "Tạo task mới",
      description:
        "Modal này là nền dialog tái sử dụng đầu tiên cho các luồng task sắp tới.",
      cancel: "Hủy",
      confirm: "Tạo task",
      fields: {
        goal: "Mục tiêu",
        risk: "Rủi ro"
      },
      placeholders: {
        goal: "Mô tả mục tiêu của task",
        risk: "Ghi lại rủi ro chính trước khi bắt đầu"
      }
    }
  },
  theme: {
    brand: "Ducky",
    sections: {
      ui: "Mẫu giao diện"
    },
    locale: {
      label: "Ngôn ngữ",
      en: "English",
      vi: "Tiếng Việt"
    },
    mode: {
      label: "Theme",
      light: "Sáng",
      dark: "Tối",
      system: "Theo hệ thống"
    },
    ui: {
      primaryButton: "Hành động chính",
      secondaryButton: "Hành động phụ",
      ghostButton: "Hành động nhẹ",
      inputLabel: "Trường nhập liệu",
      inputValue: "Nhập tại đây",
      panelTitle: "Bảng làm việc",
      panelBody:
        "Các bề mặt dễ đọc và đường viền mềm nên mang cảm giác ổn định, không phô trương."
    }
  }
} as const;
