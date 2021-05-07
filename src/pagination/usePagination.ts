import { computed, ref } from "vue";
import { paginate } from "./pagination";
import { TNode } from "./types";

interface UsePaginationOptions {
  perPage: number;
  initialPage?: number;
}

export function usePagination(
  items: any[],
  { perPage, initialPage = 1 }: UsePaginationOptions
) {
  const currentPage = ref(initialPage);

  const nodes = computed(() => {
    return paginate(items, { currentPage: currentPage.value }, { perPage });
  });

  function changePage(node: TNode) {
    if (node.type === "pageNumber") {
      currentPage.value = node.value;
    }

    if (node.type === "navigation") {
      if (node.action === "gotoFirst") {
        currentPage.value = 1;
      }

      if (node.action === "gotoLast") {
        currentPage.value = Math.ceil(items.length / perPage);
      }

      if (node.action === "next") {
        currentPage.value =
          currentPage.value < Math.ceil(items.length / perPage)
            ? (currentPage.value += 1)
            : currentPage.value;
      }

      if (node.action === "previous") {
        currentPage.value =
          currentPage.value > 1 ? (currentPage.value -= 1) : currentPage.value;
      }
    }
  }

  return {
    currentPage,
    nodes,
    changePage,
  };
}
