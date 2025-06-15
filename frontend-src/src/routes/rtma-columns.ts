import type { ColumnDef } from "@tanstack/table-core";
import type { ProcessedSignature } from "./sig-types";
import SortButton from "./sort-button.svelte";
import { renderComponent } from "$lib/components/ui/data-table";

export const rtmaColumns: ColumnDef<ProcessedSignature>[] = [
  {
    accessorKey: "firstByte",
    header: ({ column }) =>
      renderComponent(SortButton, {
        onclick: column.getToggleSortingHandler(),
        label: "First Byte",
      }),
  },
  {
    accessorKey: "size",
    header: ({ column }) =>
      renderComponent(SortButton, {
        onclick: column.getToggleSortingHandler(),
        label: "Size",
      }),
  },
  {
    accessorKey: "hash",
    header: "Hash"
  },
  {
    accessorKey: "pageLow",
    header: ({ column }) =>
      renderComponent(SortButton, {
        onclick: column.getToggleSortingHandler(),
        label: "Page Low",
      }),
  },
  {
    accessorKey: "pageHigh",
    header: ({ column }) =>
      renderComponent(SortButton, {
        onclick: column.getToggleSortingHandler(),
        label: "Page High",
      }),
  },
  {
    accessorKey: "flags",
    header: ({ column }) =>
      renderComponent(SortButton, {
        onclick: column.getToggleSortingHandler(),
        label: "Flags",
      }),
  },
  {
    accessorKey: "moduleSize",
    header: ({ column }) =>
      renderComponent(SortButton, {
        onclick: column.getToggleSortingHandler(),
        label: "Module Size",
      }),
  },
  {
    accessorKey: "time",
    header: ({ column }) =>
      renderComponent(SortButton, {
        onclick: column.getToggleSortingHandler(),
        label: "Time",
      }),
  },
  {
    accessorKey: "build",
    header: ({ column }) =>
      renderComponent(SortButton, {
        onclick: column.getToggleSortingHandler(),
        label: "Build",
      }),
  },
  {
    accessorKey: "translation",
    header: ({ column }) =>
      renderComponent(SortButton, {
        onclick: column.getToggleSortingHandler(),
        label: "Translation",
      }),
  },
];