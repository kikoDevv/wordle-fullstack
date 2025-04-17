document.addEventListener("DOMContentLoaded", function () {
	const toggleBtn = document.getElementById("sidebar-toggle");
	const closeBtn = document.getElementById("sidebar-close");
	const sidebar = document.getElementById("sidebar");
	const overlay = document.getElementById("sidebar-overlay");
	const mainContent = document.getElementById("main-content");

	function openSidebar() {
		sidebar.classList.remove("transform", "-translate-x-full");
		sidebar.classList.add("transform", "translate-x-0");
		overlay.classList.remove("hidden");
		if (window.innerWidth > 768) {
			mainContent.style.marginLeft = "256px";
			mainContent.style.transition = "margin-left 0.3s ease-in-out";
		}
	}

	function closeSidebar() {
		sidebar.classList.remove("transform", "translate-x-0");
		sidebar.classList.add("transform", "-translate-x-full");
		overlay.classList.add("hidden");
		mainContent.style.marginLeft = "0";
	}

	if (toggleBtn) {
		toggleBtn.addEventListener("click", openSidebar);
	}

	if (closeBtn) {
		closeBtn.addEventListener("click", closeSidebar);
	}

	if (overlay) {
		overlay.addEventListener("click", closeSidebar);
	}
});
