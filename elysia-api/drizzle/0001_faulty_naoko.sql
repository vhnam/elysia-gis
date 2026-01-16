CREATE TYPE "public"."administrative_unit_legacy_level" AS ENUM('province', 'district', 'ward');--> statement-breakpoint
CREATE TYPE "public"."administrative_unit_level" AS ENUM('province', 'district', 'ward');--> statement-breakpoint
CREATE TABLE "administrative_unit_legacy" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"level" "administrative_unit_legacy_level" NOT NULL,
	"order" integer NOT NULL,
	"geom" geometry(Geometry, 4326) NOT NULL,
	"additional_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "administrative_unit_legacy_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "administrative_unit_mapping" (
	"id" text PRIMARY KEY NOT NULL,
	"unit_id" text NOT NULL,
	"legacy_unit_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "administrative_unit" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"level" "administrative_unit_level" NOT NULL,
	"order" integer NOT NULL,
	"geom" geometry(Geometry, 4326) NOT NULL,
	"additional_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "administrative_unit_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE INDEX "administrative_unit_legacy_geom_idx" ON "administrative_unit_legacy" USING gist ("geom");--> statement-breakpoint
CREATE INDEX "administrative_unit_legacy_code_idx" ON "administrative_unit_legacy" USING btree ("code");--> statement-breakpoint
CREATE INDEX "administrative_unit_legacy_level_idx" ON "administrative_unit_legacy" USING btree ("level");--> statement-breakpoint
CREATE INDEX "administrative_unit_mapping_unit_id_idx" ON "administrative_unit_mapping" USING btree ("unit_id");--> statement-breakpoint
CREATE INDEX "administrative_unit_mapping_legacy_unit_id_idx" ON "administrative_unit_mapping" USING btree ("legacy_unit_id");--> statement-breakpoint
CREATE INDEX "administrative_unit_geom_idx" ON "administrative_unit" USING gist ("geom");--> statement-breakpoint
CREATE INDEX "administrative_unit_code_idx" ON "administrative_unit" USING btree ("code");--> statement-breakpoint
CREATE INDEX "administrative_unit_level_idx" ON "administrative_unit" USING btree ("level");