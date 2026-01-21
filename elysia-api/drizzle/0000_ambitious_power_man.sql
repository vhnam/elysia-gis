CREATE TYPE "gis"."administrative_unit_legacy_level" AS ENUM('province', 'district', 'ward');--> statement-breakpoint
CREATE TYPE "gis"."administrative_unit_level" AS ENUM('province', 'district', 'ward');--> statement-breakpoint
CREATE TYPE "public"."request_type" AS ENUM('people', 'medical', 'food', 'supplies', 'shelter', 'transportation');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gis"."administrative_unit_legacy" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"level" "gis"."administrative_unit_legacy_level" NOT NULL,
	"order" integer NOT NULL,
	"geom" geometry(Geometry, 4326) NOT NULL,
	"additional_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "administrative_unit_legacy_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "gis"."administrative_unit_mapping" (
	"id" text PRIMARY KEY NOT NULL,
	"unit_id" text NOT NULL,
	"legacy_unit_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gis"."administrative_unit" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"level" "gis"."administrative_unit_level" NOT NULL,
	"order" integer NOT NULL,
	"geom" geometry(Geometry, 4326) NOT NULL,
	"additional_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "administrative_unit_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "rescue_request" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"address" text,
	"request_type" "request_type" NOT NULL,
	"description" text,
	"location" geometry(Point, 4326) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "administrative_unit_legacy_geom_idx" ON "gis"."administrative_unit_legacy" USING gist ("geom");--> statement-breakpoint
CREATE INDEX "administrative_unit_legacy_code_idx" ON "gis"."administrative_unit_legacy" USING btree ("code");--> statement-breakpoint
CREATE INDEX "administrative_unit_legacy_level_idx" ON "gis"."administrative_unit_legacy" USING btree ("level");--> statement-breakpoint
CREATE INDEX "administrative_unit_mapping_unit_id_idx" ON "gis"."administrative_unit_mapping" USING btree ("unit_id");--> statement-breakpoint
CREATE INDEX "administrative_unit_mapping_legacy_unit_id_idx" ON "gis"."administrative_unit_mapping" USING btree ("legacy_unit_id");--> statement-breakpoint
CREATE INDEX "administrative_unit_geom_idx" ON "gis"."administrative_unit" USING gist ("geom");--> statement-breakpoint
CREATE INDEX "administrative_unit_code_idx" ON "gis"."administrative_unit" USING btree ("code");--> statement-breakpoint
CREATE INDEX "administrative_unit_level_idx" ON "gis"."administrative_unit" USING btree ("level");--> statement-breakpoint
CREATE INDEX "rescue_request_location_idx" ON "rescue_request" USING gist ("location");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");